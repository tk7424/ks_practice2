const program = require("commander");
const fs = require("fs");
const md2gtml = require("./md2html");

// gfmオプションを定義する
program.option("--gfm", "GFMを有効にする");
// コマンドライン引数からファイルパスを取得する
program.parse(process.argv);
const filePath = program.args[0];

// コマンドライン引数のオプションを取得し、デフォルトのオプションを上書きする
const cliOptions = {
    gfm: false,
    ...program.opts(),
};


fs.readFile(filePath, { encoding: "utf8" }, (err, file) => {
    if (err) {
        console.error(err);
        // 終了ステータス 1（一般的なエラー）としてプロセスを終了する
        process.exit(1);
        return;
    }
    // MarkdownファイルをHTML文字列に変換する
    const html = md2gtml(file, cliOptions);
    console.log(html);
}); 