import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  stages: [
    {duration:'1s', target: 1200},
    {duration:'29s', target: 1200},
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(99)<2000']
  },
};

export default function() {
  const productId = Math.floor(Math.random() * (1000010 - (1000010 - 100001)) + (1000010 - 100001))

  const url = `http://localhost:3000/qa/questions?product_id=${productId}`
  const response = http.get(url);
  sleep(1);
}