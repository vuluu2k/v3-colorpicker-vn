// import packageInfo from "../package.json";
// import { text } from "./banner.json";

process.stdout.write("/*! Vu Library v${version} */\n".replace("${version}", "1.0.0"));
process.stdin.pipe(process.stdout);
