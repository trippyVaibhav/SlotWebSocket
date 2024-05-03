import * as https from 'https';

// Function to make API call
export function callAPI(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const options: https.RequestOptions = {
        hostname: 'api.example.com',
        path: '/endpoint',
        method: 'GET',
      };
  
      const req = https.request(options, res => {
        let data = '';
  
        res.on('data', chunk => {
          data += chunk;
        });
  
        res.on('end', () => {
          resolve(data);
        });
      });
  
      req.on('error', error => {
        reject(error);
      });
  
      req.end();
    });
  }