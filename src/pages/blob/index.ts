import { page } from "epact"

export default page({
  get(req, res) {
    res.end(`<!DOCTYPE html>
    <html>
    
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title></title>
    </head>
    
    <body>
      <h3 id="-how-to-use-this-">これはどういう風に使うの? (How to use this?)</h3>
      <p>
        ここにこのようにgetリクエストを送信します: (Send request GET to this:)
      </p>
      <pre><code class="lang-text"><span class="hljs-keyword">http</span>://localhost:<span class="hljs-number">3000</span>/api/blob/&lt;url <span class="hljs-keyword">https</span>? <span class="hljs-built_in">file</span>&gt;
    </code></pre>
      <p>
        <strong><strong>デフォルトでCookieがオンになります。</strong></strong>
      </p>
      <h3 id="options">Options</h3>
      <p>これはあなたのオプションの一部を受け入れます。:</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>cs-headers</code></td>
            <td>json encoded</td>
            <td>
              どのように「headers」フィールドをRequestに添付するかを指定できます。
              (「Host」、「Referer」、「Cookie」などのブラウザのデフォルトでブロックされたパラメータを受け入れます...
            </td>
            <td>
              <code>?cs-headers=\${encodeURIComponent(JSON.stringify({ referer:
                  &quot;https://duckduckgo.com&quot; }))}</code>
            </td>
          </tr>
          <tr>
            <td><code>cs-inherit-headers</code></td>
            <td>boolean</td>
            <td>
              これに送られた「response」に添付された「headers」が受け継がれるのか。デフォルトははい
            </td>
            <td><code>?cs-inherit-headers=false</code></td>
          </tr>
          <tr>
            <td><code>cs-append-response-headers</code></td>
            <td>boolean</td>
            <td>
              レスポンスの「ヘッダー」は送り返すのか。デフォルトははい
            </td>
            <td><code>?cs-append-response-headers=false</code></td>
          </tr>
        </tbody>
      </table>
      <style type="text/css">
        table {
          border-spacing: 0;
        }
    
        table td {
          border-right: 1px solid grey;
          border-bottom: 1px solid grey;
        }
    
        table td:first-child {
          border-left: 1px solid grey;
        }
      </style>
    </body>
    
    </html>`)
  }
})
