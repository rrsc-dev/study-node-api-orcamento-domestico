import * as http from 'http';

export const getBody = (req: http.IncomingMessage): Promise<any> => {
    return new Promise((resolve, reject) => {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                
                if (!body) {
                    resolve({});
                    return;
                }

                resolve(JSON.parse(body));
            } catch (error) {
                reject(error);
            }
        });

        req.on('error', (err) => {
            reject(err);
        });
    });
};