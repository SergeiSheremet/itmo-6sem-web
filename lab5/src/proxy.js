"use strict";
import axios from "axios";

const url = "http://localhost:3000/api/documents/";

class Proxy {
  static insert(title, body) {
    return axios.post(
      `${url}create`,
      {
        title: title,
        body: body
      },
      { 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }

  static get() {
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

export default Proxy;