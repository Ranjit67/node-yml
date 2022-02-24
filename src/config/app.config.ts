const port: number = Number(process.env.PORT) || 4000;
const database: string =
  "mongodb://skyrise:skyrise@44.197.122.155:27017/SkyRiseDB";
// const database: string = `mongodb+srv://skyrisecelebrity:${"siPhzzqgvnCAbuUm"}@cluster0.gqqoe.mongodb.net/SkyRiseDB?retryWrites=true&w=majority`
// mongo --port 27017 -u "skyrise" -p "skyrise" --authenticationDatabase "SkyRiseDB" --host 172.31.19.94
export { port, database };
