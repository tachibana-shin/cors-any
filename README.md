# cors-any

> App created by template api with Epact

This is the data source behind SPA applications and websites.

## Build Setup

```bash
# install dependencies
pnpm install

# serve with hot reload at localhost
pnpm dev

# build project
pnpm build

# start project
pnpm start
```

## API /blob/\*

### これはどういう風に使うの? (How to use this?)

ここにこのように get リクエストを送信します: (Send request GET to this:)

```text
http://localhost:3000/api/blob/<url https? file>
```

\***\*デフォルトで Cookie がオンになります。\*\***

### Options

これはあなたのオプションの一部を受け入れます。:

| Name                         | Type         | Description                                                                                                                                                                    | Example                                                                                    |
| ---------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `cs-headers`                 | json encoded | どのように「headers」フィールドを Request に添付するかを指定できます。 (「Host」、「Referer」、「Cookie」などのブラウザのデフォルトでブロックされたパラメータを受け入れます... | `?cs-headers=${encodeURIComponent(JSON.stringify({ referer: "https://duckduckgo.com" }))}` |
| `cs-inherit-headers`         | boolean      | これに送られた「response」に添付された「headers」が受け継がれるのか。デフォルトははい                                                                                          | `?cs-inherit-headers=false`                                                                |
| `cs-append-response-headers` | boolean      | レスポンスの「ヘッダー」は送り返すのか。デフォルトははい                                                                                                                       | `?cs-append-response-headers=false`                                                        |
