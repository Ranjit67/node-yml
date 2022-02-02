import schedule from "node-schedule";

class SchedulerService {
  constructor(job: any) {
    this.scheduleJob(job);
  }
  scheduleJob(job: any) {
    var rule = new schedule.RecurrenceRule();
    rule.hour = 9;
    rule.minute = 50;
    rule.second = 0;
    rule.dayOfWeek = [0, new schedule.Range(0, 6)];
    var dailyJob = schedule.scheduleJob(rule, async function () {
      await job();
    });
  }
}
export default SchedulerService;
