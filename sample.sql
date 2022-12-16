CREATE TABLE socket (
  id    TEXT              NOT NULL,
  bufferSize    INT              NOT NULL,
  bytesRead    BIGINT              NOT NULL,
  bytesWritten    TEXT              NOT NULL,
  connecting    TEXT              NOT NULL,
  destroyed    TEXT              NOT NULL,
  localAddress    TEXT              NOT NULL,
  localPort    TEXT              NOT NULL,
  localFamily    TEXT              NOT NULL,
  readyState    TEXT              NOT NULL,
  remoteAddress    TEXT              NOT NULL,
  remoteFamily    TEXT              NOT NULL,
  remotePart    TEXT              NOT NULL,
  timeout    TEXT              NOT NULL,
  UNIQUE(id)
);

CREATE TABLE request (
  id    TEXT              NOT NULL,
  query    TEXT              NOT NULL,
  params    TEXT              NOT NULL,
  baseUrl    TEXT              NOT NULL,
  originalUrl    TEXT              NOT NULL,
  _parsedUrl    TEXT              NOT NULL,
  url    TEXT              NOT NULL,
  method    TEXT              NOT NULL,
  statusCode    TEXT              NOT NULL,
  statusMessage    TEXT              NOT NULL,
  socket    TEXT              NOT NULL,
  rawHeaders    TEXT              NOT NULL,
  httpVersionMajor    TEXT              NOT NULL,
  httpVersionMinor    TEXT              NOT NULL,
  httpVersion    TEXT              NOT NULL,
  UNIQUE(id)
);

CREATE TABLE response (
  time        TIMESTAMPTZ       NOT NULL,
  id    TEXT              NOT NULL,
  requestId    TEXT              NOT NULL,
  query    TEXT              NOT NULL,
  params    TEXT              NOT NULL,
  baseUrl    TEXT              NOT NULL,
  originalUrl    TEXT              NOT NULL,
  _parsedUrl    TEXT              NOT NULL,
  url    TEXT              NOT NULL,
  method    TEXT              NOT NULL,
  statusCode    TEXT              NOT NULL,
  statusMessage    TEXT              NOT NULL,
  socket    TEXT              NOT NULL,
  rawHeaders    TEXT              NOT NULL,
  httpVersionMajor    TEXT              NOT NULL,
  httpVersionMinor    TEXT              NOT NULL,
  httpVersion    TEXT              NOT NULL,
  UNIQUE(time, id)
);

CREATE TABLE event (
  id    TEXT              NOT NULL,
  state    TEXT              NOT NULL,
  UNIQUE(id)
);

CREATE TABLE analytic {
  time        TIMESTAMPTZ       NOT NULL,
  id    TEXT              NOT NULL,
  request    TEXT              NOT NULL,
  response    TEXT              NOT NULL,
  state    TEXT              NOT NULL,
  UNIQUE(id, time)
}
