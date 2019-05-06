"use strict";
import axios from "axios";

const url = "http://localhost:3000/api/documents/";

export class ProxyService {
  static insert(title, content) {
    return axios.post(
      `${url}create`,
      {
        title: title,
        content: content
      },
      { 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }

  static index() {
    return axios.get(url);
  }

  static get(id) {
    return axios.get(`${url}${id}`);
  }

  static update(id, title, body) {
    return axios.put(
      `${url}update/${id}`,
      {
        title: title,
        body: body
      },
      {
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
}
