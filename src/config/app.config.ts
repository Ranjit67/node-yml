const port: number = Number(process.env.PORT) || 4000;
const database: string = `mongodb+srv://skyrisecelebrity:${"siPhzzqgvnCAbuUm"}@cluster0.gqqoe.mongodb.net/SkyRiseDB?retryWrites=true&w=majority`

export {
    port,
    database
}