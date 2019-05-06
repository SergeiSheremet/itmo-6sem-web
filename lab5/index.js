const http = require('http'),
      MdAPI = require('./config'),
      MdServer = http.Server(MdAPI),
      MdPORT = process.env.PORT || 3001,
      LOCAL = '0.0.0.0';

MdServer.listen(MdPORT, LOCAL, () => console.log(`Markdown running on ${MdPORT}`));