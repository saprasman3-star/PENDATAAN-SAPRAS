/*
  Vercel API proxy for Website Pendataan Sarana Prasarana.

  Setup:
  1. Deploy your Google Apps Script as Web App.
  2. Copy the Web App URL that ends with /exec.
  3. In Vercel, add Environment Variable:
     APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXX/exec

  This route keeps the frontend calling /api/sapras while forwarding
  requests safely to Google Apps Script.
*/

const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL || 'PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function isConfigured() {
  return APPS_SCRIPT_URL && !APPS_SCRIPT_URL.includes('PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE');
}

function buildTargetUrl(req) {
  const targetUrl = new URL(APPS_SCRIPT_URL);
  const incomingUrl = new URL(req.url, 'https://vercel.local');

  incomingUrl.searchParams.forEach((value, key) => {
    targetUrl.searchParams.set(key, value);
  });

  return targetUrl.toString();
}

function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body) {
      if (typeof req.body === 'string') return resolve(req.body);
      return resolve(JSON.stringify(req.body));
    }

    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

module.exports = async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (!isConfigured()) {
    return res.status(500).json({
      success: false,
      message: 'APPS_SCRIPT_URL belum diatur. Isi Environment Variable APPS_SCRIPT_URL di Vercel atau tempel URL Apps Script di api/sapras.js.'
    });
  }

  try {
    if (req.method === 'GET') {
      const response = await fetch(buildTargetUrl(req), {
        method: 'GET',
        redirect: 'follow'
      });

      const text = await response.text();
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      return res.status(200).send(text);
    }

    if (req.method === 'POST') {
      const body = await getRequestBody(req);

      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body,
        redirect: 'follow'
      });

      const text = await response.text();
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      return res.status(200).send(text);
    }

    return res.status(405).json({
      success: false,
      message: 'Method tidak didukung.'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Terjadi kesalahan pada server Vercel.'
    });
  }
};

module.exports.config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
};
