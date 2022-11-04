import express, { Express, Request, Response } from 'express';
import ical from 'node-ical'

const app = express();
const port = 3000;
//const url = "https://calendar.google.com/calendar/ical/emile%40le-gallic.com/private-cf11f80652b038b843c55bab69dad969/basic.ics"
const url = "https://synapses.telecom-paris.fr/calendar/ical/9a6a16cbf76e8440184280037b9eeef2eed8dfdc6ee9769d95e0d046b42fd829"

async function getCal(url: string) {
  var res: ical.CalendarResponse = await ical.async.fromURL(url)
  return res
}

app.get('/', async (req: Request, res: Response) => {
  const cal = await getCal(url)
  res.send(cal);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

ical.fromURL(url, {}, function(error, data) {
  console.log(data)
})