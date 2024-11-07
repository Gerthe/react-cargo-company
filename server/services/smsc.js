import FormData from 'form-data';
import fs from 'fs';
import * as https from 'https';
import env from '../config/envConfig.js';

class SmsApi {
  constructor() {
    this.ssl = false;
    this.def_fmt = 3;
    this.host = 'smsc.kz';
    this.charset = 'utf-8';
    this.login = 'login';
    this.password = 'password';
    this.apiKey = env.SMSC_APIKEY;
    this.sender = null;
    this.PHONE_TYPES = {
      string: 1,
      number: 2,
    };
  }

  getHost(www = '') {
    return `${this.ssl ? 'https://' : 'http://'}${www}${this.host}/sys/`;
  }

  isInArr(arr, val) {
    return Array.isArray(arr) && arr.includes(val);
  }

  convertData(data, notConvert = []) {
    if (data.fmt) delete data.fmt;
    if (data.msg) {
      data.mes = data.msg;
      delete data.msg;
    }
    if (data.message) {
      data.mes = data.message;
      delete data.message;
    }
    if (data.phone && !this.isInArr(notConvert, 'phone')) {
      data.phones = data.phone;
      delete data.phone;
    }
    if (data.number) {
      data.phones = data.number;
      delete data.number;
    }
    if (data.list) {
      data.list = Object.entries(data.list)
        .map(([key, value]) => `${key}:${value}`)
        .join('\n');
      delete data.mes;
    }
    if (data.phones && !((typeof data.phones) in this.PHONE_TYPES)) {
      data.phones = data.phones.join(',');
    }
  }

  convertFiles(form, data) {
    if (!data.files) return;
    if (typeof data.files === 'string') {
      const fileData = fs.readFileSync(data.files);
      form.append('file', fileData, { filename: data.files });
      return;
    }
    Object.entries(data.files).forEach(([key, filePath]) => {
      const fileData = fs.readFileSync(filePath);
      form.append(key, fileData, { filename: filePath });
    });
    delete data.files;
  }

  readUrl(prs, callback, notConvert = []) {
    const fmt = prs.fmt || this.def_fmt;
    const form = new FormData();

    form.append('fmt', fmt);
    /*    form.append('login', this.login);
        form.append('psw', this.password);*/
    form.append('apikey', this.apiKey);
    form.append('charset', this.charset);
    if (prs.type) form.append(prs.type, 1);

    if (prs.data) {
      this.convertData(prs.data, notConvert);
      if (prs.data.files) {
        this.convertFiles(form, prs.data);
      }
      Object.entries(prs.data).forEach(([key, value]) =>
        form.append(key, value)
      );
    }

    let www = '';
    let attempts = 0;

    const submit = () => {
      form.submit(this.getHost(www) + prs.file, (err, res) => {
        if (err) {
          if (++attempts < 5) {
            www = `www${attempts > 1 ? attempts : ''}.`;
            submit();
          } else {
            const error = { error: 'Connection Error', error_code: 100 };
            callback(
              error,
              JSON.stringify(error),
              error.error,
              error.error_code
            );
          }
          return;
        }

        res.setEncoding(this.charset);
        let fullData = '';

        res.on('data', (chunk) => {
          fullData += chunk;
        });

        res.on('end', () => {
          const parsedData = JSON.parse(fullData);
          callback(
            parsedData,
            fullData,
            parsedData.error_code ? parsedData.error : null,
            parsedData.error_code || null
          );
        });
      });
    };

    submit();
  }

  configure({ ssl, login, password, charset }) {
    this.ssl = Boolean(ssl);
    this.login = login || this.login;
    this.password = password || this.password;
    this.charset = charset || this.charset;
  }

  send(type, data = {}, callback) {
    const opts = { file: 'send.php', data, type };
    this.readUrl(opts, callback);
  }

  sendSms(data = {}, callback) {
    this.readUrl({ file: 'send.php', data }, callback);
  }

  getStatus(data = {}, callback) {
    if (data.phones) {
      data.phone = data.phones;
      delete data.phones;
    }
    if (data.number) {
      data.phone = data.number;
      delete data.number;
    }
    if (data.phone && !((typeof data.phone) in this.PHONE_TYPES)) {
      data.phone = data.phone.join(',');
    }
    this.readUrl({ file: 'status.php', data }, callback, ['phone']);
  }

  getBalance(callback) {
    this.readUrl(
      { file: 'balance.php', data: { cur: 1 } },
      (balanceData, rawResponse, error, errorCode) => {
        callback(
          error ? 0 : balanceData.balance,
          rawResponse,
          error,
          errorCode
        );
      }
    );
  }

  getSmsCost(data = {}, callback) {
    if (!data.cost) data.cost = 1;
    this.readUrl(
      { file: 'send.php', data },
      (costData, rawResponse, error, errorCode) => {
        callback(error ? 0 : costData.cost, rawResponse, error, errorCode);
      }
    );
  }

  raw(file, data = {}, callback) {
    this.readUrl({ file, data }, callback);
  }

  test(callback) {
    this.readUrl({ file: 'balance.php' }, (data, rawResponse, error) => {
      callback(error);
    });
  }

  sendTelegramCode(phone, message, callback) {
    const url = `${this.getHost()}send.php?apikey=${this.apiKey}&phones=${encodeURIComponent(phone)}&mes=${encodeURIComponent(message)}&tg=1`;

    const urlObject = new URL(url);
    const options = {
      hostname: urlObject.hostname,
      path: urlObject.pathname + urlObject.search,
      method: 'GET',
    };

    const req = https.request(options, (res) => {
      let data = '';

      // Собираем данные ответа
      res.on('data', (chunk) => {
        data += chunk;
      });

      // Обрабатываем полный ответ
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          if (parsedData.error) {
            callback(null, parsedData.error, parsedData.error_code);
          } else {
            callback(parsedData, null, null);
          }
        } catch (error) {
          callback(null, 'Failed to parse response', 100);
        }
      });
    });

    // Обрабатываем ошибку запроса
    req.on('error', (error) => {
      callback(null, error.message, 100);
    });

    req.end();
  }
}

const smsApi = new SmsApi();

export default smsApi;
