const fs = require('fs');

console.log(1);

fs.readFile('./result.json', (err, data) => {
  if (err) throw err;
  let results = JSON.parse(data);
  const t_10_replan = results.filter((trial) => {
    return (
      trial.name.split('_')[0] === 'murosaplan' &&
      trial.name.split('_')[2] === '10' &&
      trial.name.split('_')[3] !== 'no' &&
      trial.name.split('_')[1] !== 'patrol'
    );
  });
  const t_10_replan_success = t_10_replan.filter(
    (trial) => trial.status === 'Success'
  );
  const t_10_replan_failed = t_10_replan.filter(
    (trial) => trial.status === 'Failed'
  );
  const t_10_replan_timeout = t_10_replan.filter(
    (trial) => trial.task_time === false
  );
  const t_10_replan_replan = t_10_replan.filter(
    (trial) => trial.replan === 'Replan'
  );
  const t_10_replan_avg_task_time =
    t_10_replan.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_10_replan.length;
  const t_10_replan_success_avg_task_time =
    t_10_replan_success.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_10_replan_success.length;
  const t_10_replan_failed_avg_task_time =
    t_10_replan_failed.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_10_replan_failed.length;
  console.log('t_10_replan_success', t_10_replan_success.length);
  console.log('t_10_replan_failed', t_10_replan_failed.length);
  console.log('t_10_replan_timeout', t_10_replan_timeout.length);
  console.log(
    't_10_replan_percentage',
    t_10_replan_success.length / t_10_replan.length
  );
  console.log('t_10_replan_avg_task_time', t_10_replan_avg_task_time);
  console.log(
    't_10_replan_success_avg_task_time',
    t_10_replan_success_avg_task_time
  );
  console.log(
    't_10_replan_failed_avg_task_time',
    t_10_replan_failed_avg_task_time
  );
  console.log(
    't_10_replan_replan',
    t_10_replan_replan.length
  );

  const t_30_replan = results.filter(
    (trial) =>
      trial.name.split('_')[0] === 'murosaplan' &&
      trial.name.split('_')[2] === '30' &&
      trial.name.split('_')[3] !== 'no' &&
      trial.name.split('_')[1] !== 'patrol'
  );
  const t_30_replan_success = t_30_replan.filter(
    (trial) => trial.status === 'Success'
  );
  const t_30_replan_failed = t_30_replan.filter(
    (trial) => trial.status === 'Failed'
  );
  const t_30_replan_timeout = t_30_replan.filter(
    (trial) => trial.task_time === false
  );
  const t_30_replan_replan = t_30_replan.filter(
    (trial) => trial.replan === 'Replan'
  );
  const t_30_replan_avg_task_time =
    t_30_replan.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_30_replan.length;
  const t_30_replan_success_avg_task_time =
    t_30_replan_success.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_30_replan_success.length;
  const t_30_replan_failed_avg_task_time =
    t_30_replan_failed.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_30_replan_failed.length;
  console.log('t_30_replan_success', t_30_replan_success.length);
  console.log('t_30_replan_failed', t_30_replan_failed.length);
  console.log('t_30_replan_timeout', t_30_replan_timeout.length);
  console.log(
    't_30_replan_percentage',
    t_30_replan_success.length / t_30_replan.length
  );
  console.log('t_30_replan_avg_task_time', t_30_replan_avg_task_time);
  console.log(
    't_30_replan_success_avg_task_time',
    t_30_replan_success_avg_task_time
  );
  console.log(
    't_30_replan_failed_avg_task_time',
    t_30_replan_failed_avg_task_time
  );
  console.log(
    't_30_replan_replan',
    t_30_replan_replan.length
  );

  const t_50_replan = results.filter(
    (trial) =>
      trial.name.split('_')[0] === 'murosaplan' &&
      trial.name.split('_')[2] === '50' &&
      trial.name.split('_')[3] !== 'no' &&
      trial.name.split('_')[1] !== 'patrol'
  );
  const t_50_replan_success = t_50_replan.filter(
    (trial) => trial.status === 'Success'
  );
  const t_50_replan_failed = t_50_replan.filter(
    (trial) => trial.status === 'Failed'
  );
  const t_50_replan_timeout = t_50_replan.filter(
    (trial) => trial.task_time === false
  );
  const t_50_replan_replan = t_50_replan.filter(
    (trial) => trial.replan === 'Replan'
  );
  const t_50_replan_avg_task_time =
    t_50_replan.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_50_replan.length;
  const t_50_replan_success_avg_task_time =
    t_50_replan_success.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_50_replan_success.length;
  const t_50_replan_failed_avg_task_time =
    t_50_replan_failed.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_50_replan_failed.length;
  console.log('t_50_replan_success', t_50_replan_success.length);
  console.log('t_50_replan_failed', t_50_replan_failed.length);
  console.log('t_50_replan_timeout', t_50_replan_timeout.length);
  console.log(
    't_50_replan_percentage',
    t_50_replan_success.length / t_50_replan.length
  );
  console.log('t_50_replan_avg_task_time', t_50_replan_avg_task_time);
  console.log(
    't_50_replan_success_avg_task_time',
    t_50_replan_success_avg_task_time
  );
  console.log(
    't_50_replan_failed_avg_task_time',
    t_50_replan_failed_avg_task_time
  );
  console.log(
    't_50_replan_replan',
    t_50_replan_replan.length
  );

  const t_70_replan = results.filter(
    (trial) =>
      trial.name.split('_')[0] === 'murosaplan' &&
      trial.name.split('_')[2] === '70' &&
      trial.name.split('_')[3] !== 'no' &&
      trial.name.split('_')[1] !== 'patrol'
  );
  const t_70_replan_success = t_70_replan.filter(
    (trial) => trial.status === 'Success'
  );
  const t_70_replan_failed = t_70_replan.filter(
    (trial) => trial.status === 'Failed'
  );
  const t_70_replan_timeout = t_70_replan.filter(
    (trial) => trial.task_time === false
  );
  const t_70_replan_replan = t_70_replan.filter(
    (trial) => trial.replan === 'Replan'
  );
  const t_70_replan_avg_task_time =
    t_70_replan.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_70_replan.length;
  const t_70_replan_success_avg_task_time =
    t_70_replan_success.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_70_replan_success.length;
  const t_70_replan_failed_avg_task_time =
    t_70_replan_failed.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_70_replan_failed.length;
  console.log('t_70_replan_success', t_70_replan_success.length);
  console.log('t_70_replan_failed', t_70_replan_failed.length);
  console.log('t_70_replan_timeout', t_70_replan_timeout.length);
  console.log(
    't_70_replan_percentage',
    t_70_replan_success.length / t_70_replan.length
  );
  console.log('t_70_replan_avg_task_time', t_70_replan_avg_task_time);
  console.log(
    't_70_replan_success_avg_task_time',
    t_70_replan_success_avg_task_time
  );
  console.log(
    't_70_replan_failed_avg_task_time',
    t_70_replan_failed_avg_task_time
  );
  console.log(
    't_70_replan_replan',
    t_70_replan_replan.length
  );

  const t_10_no_replan = results.filter(
    (trial) =>
      trial.name.split('_')[0] === 'murosaplan' &&
      trial.name.split('_')[2] === '10' &&
      trial.name.split('_')[3] === 'no' &&
      trial.name.split('_')[1] !== 'patrol'
  );
  const t_10_no_replan_success = t_10_no_replan.filter(
    (trial) => trial.status === 'Success'
  );
  const t_10_no_replan_failed = t_10_no_replan.filter(
    (trial) => trial.status === 'Failed'
  );
  const t_10_no_replan_timeout = t_10_no_replan.filter(
    (trial) => trial.task_time === false
  );
  const t_10_no_replan_replan = t_10_no_replan.filter(
    (trial) => trial.replan === 'Replan'
  );
  const t_10_no_replan_avg_task_time =
    t_10_no_replan.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_10_no_replan.length;
  const t_10_no_replan_success_avg_task_time =
    t_10_no_replan_success.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_10_no_replan_success.length;
  const t_10_no_replan_failed_avg_task_time =
    t_10_no_replan_failed.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_10_no_replan_failed.length;
  console.log('t_10_no_replan_success', t_10_no_replan_success.length);
  console.log('t_10_no_replan_failed', t_10_no_replan_failed.length);
  console.log('t_10_no_replan_timeout', t_10_no_replan_timeout.length);
  console.log(
    't_10_no_replan_percentage',
    t_10_no_replan_success.length / t_10_no_replan.length
  );
  console.log('t_10_no_replan_avg_task_time', t_10_no_replan_avg_task_time);
  console.log(
    't_10_no_replan_success_avg_task_time',
    t_10_no_replan_success_avg_task_time
  );
  console.log(
    't_10_no_replan_failed_avg_task_time',
    t_10_no_replan_failed_avg_task_time
  );
  console.log(
    't_10_no_replan_replan',
    t_10_no_replan_replan.length
  );

  const t_30_no_replan = results.filter(
    (trial) =>
      trial.name.split('_')[0] === 'murosaplan' &&
      trial.name.split('_')[2] === '30' &&
      trial.name.split('_')[3] === 'no' &&
      trial.name.split('_')[1] !== 'patrol'
  );
  const t_30_no_replan_success = t_30_no_replan.filter(
    (trial) => trial.status === 'Success'
  );
  const t_30_no_replan_failed = t_30_no_replan.filter(
    (trial) => trial.status === 'Failed'
  );
  const t_30_no_replan_timeout = t_30_no_replan.filter(
    (trial) => trial.task_time === false
  );
  const t_30_no_replan_replan = t_30_no_replan.filter(
    (trial) => trial.replan === 'Replan'
  );
  const t_30_no_replan_avg_task_time =
    t_30_no_replan.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_30_no_replan.length;
  const t_30_no_replan_success_avg_task_time =
    t_30_no_replan_success.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_30_no_replan_success.length;
  const t_30_no_replan_failed_avg_task_time =
    t_30_no_replan_failed.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_30_no_replan_failed.length;
  console.log('t_30_no_replan_success', t_30_no_replan_success.length);
  console.log('t_30_no_replan_failed', t_30_no_replan_failed.length);
  console.log('t_30_no_replan_timeout', t_30_no_replan_timeout.length);
  console.log(
    't_30_no_replan_percentage',
    t_30_no_replan_success.length / t_30_no_replan.length
  );
  console.log('t_30_no_replan_avg_task_time', t_30_no_replan_avg_task_time);
  console.log(
    't_30_no_replan_success_avg_task_time',
    t_30_no_replan_success_avg_task_time
  );
  console.log(
    't_30_no_replan_failed_avg_task_time',
    t_30_no_replan_failed_avg_task_time
  );
  console.log(
    't_30_no_replan_replan',
    t_30_no_replan_replan.length
  );

  const t_50_no_replan = results.filter(
    (trial) =>
      trial.name.split('_')[0] === 'murosaplan' &&
      trial.name.split('_')[2] === '50' &&
      trial.name.split('_')[3] === 'no' &&
      trial.name.split('_')[1] !== 'patrol'
  );
  const t_50_no_replan_success = t_50_no_replan.filter(
    (trial) => trial.status === 'Success'
  );
  const t_50_no_replan_failed = t_50_no_replan.filter(
    (trial) => trial.status === 'Failed'
  );
  const t_50_no_replan_timeout = t_50_no_replan.filter(
    (trial) => trial.task_time === false
  );
  const t_50_no_replan_replan = t_50_no_replan.filter(
    (trial) => trial.replan === 'Replan'
  );
  const t_50_no_replan_avg_task_time =
    t_50_no_replan.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_50_no_replan.length;
  const t_50_no_replan_success_avg_task_time =
    t_50_no_replan_success.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_50_no_replan_success.length;
  const t_50_no_replan_failed_avg_task_time =
    t_50_no_replan_failed.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_50_no_replan_failed.length;
  console.log('t_50_no_replan_success', t_50_no_replan_success.length);
  console.log('t_50_no_replan_failed', t_50_no_replan_failed.length);
  console.log('t_50_no_replan_timeout', t_50_no_replan_timeout.length);
  console.log(
    't_50_no_replan_percentage',
    t_50_no_replan_success.length / t_50_no_replan.length
  );
  console.log('t_50_no_replan_avg_task_time', t_50_no_replan_avg_task_time);
  console.log(
    't_50_no_replan_success_avg_task_time',
    t_50_no_replan_success_avg_task_time
  );
  console.log(
    't_50_no_replan_failed_avg_task_time',
    t_50_no_replan_failed_avg_task_time
  );
  console.log(
    't_50_no_replan_replan',
    t_50_no_replan_replan.length
  );

  const t_70_no_replan = results.filter(
    (trial) =>
      trial.name.split('_')[0] === 'murosaplan' &&
      trial.name.split('_')[2] === '70' &&
      trial.name.split('_')[3] === 'no' &&
      trial.name.split('_')[1] !== 'patrol'
  );
  const t_70_no_replan_success = t_70_no_replan.filter(
    (trial) => trial.status === 'Success'
  );
  const t_70_no_replan_failed = t_70_no_replan.filter(
    (trial) => trial.status === 'Failed'
  );
  const t_70_no_replan_timeout = t_70_no_replan.filter(
    (trial) => trial.task_time === false
  );
  const t_70_no_replan_replan = t_70_no_replan.filter(
    (trial) => trial.replan === 'Replan'
  );
  const t_70_no_replan_avg_task_time =
    t_70_no_replan.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_70_no_replan.length;
  const t_70_no_replan_success_avg_task_time =
    t_70_no_replan_success.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_70_no_replan_success.length;
  const t_70_no_replan_failed_avg_task_time =
    t_70_no_replan_failed.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_70_no_replan_failed.length;
  console.log('t_70_no_replan_success', t_70_no_replan_success.length);
  console.log('t_70_no_replan_failed', t_70_no_replan_failed.length);
  console.log('t_70_no_replan_timeout', t_70_no_replan_timeout.length);
  console.log(
    't_70_no_replan_percentage',
    t_70_no_replan_success.length / t_70_no_replan.length
  );
  console.log('t_70_no_replan_avg_task_time', t_70_no_replan_avg_task_time);
  console.log(
    't_70_no_replan_success_avg_task_time',
    t_70_no_replan_success_avg_task_time
  );
  console.log(
    't_70_no_replan_failed_avg_task_time',
    t_70_no_replan_failed_avg_task_time
  );
  console.log(
    't_70_no_replan_replan',
    t_70_no_replan_replan.length
  );

  const t_plansys2_10_no_replan = results.filter(
    (trial) =>
      trial.name.split('_')[0] === 'plansys2' &&
      trial.name.split('_')[2] === '10' &&
      trial.name.split('_')[1] !== 'patrol'
  );
  const t_plansys2_10_no_replan_success = t_plansys2_10_no_replan.filter(
    (trial) => trial.status === 'Success'
  );
  const t_plansys2_10_no_replan_failed = t_plansys2_10_no_replan.filter(
    (trial) => trial.status === 'Failed'
  );
  const t_plansys2_10_no_replan_timeout = t_plansys2_10_no_replan.filter(
    (trial) => trial.task_time === false
  );
  const t_plansys2_10_no_replan_replan = t_plansys2_10_no_replan.filter(
    (trial) => trial.replan === 'Replan'
  );
  const t_plansys2_10_no_replan_avg_task_time =
    t_plansys2_10_no_replan.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_plansys2_10_no_replan.length;
  const t_plansys2_10_no_replan_success_avg_task_time =
    t_plansys2_10_no_replan_success.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_plansys2_10_no_replan_success.length;
  const t_plansys2_10_no_replan_failed_avg_task_time =
    t_plansys2_10_no_replan_failed.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_plansys2_10_no_replan_failed.length;
  console.log(
    't_plansys2_10_no_replan_success',
    t_plansys2_10_no_replan_success.length
  );
  console.log(
    't_plansys2_10_no_replan_failed',
    t_plansys2_10_no_replan_failed.length
  );
  console.log(
    't_plansys2_10_no_replan_timeout',
    t_plansys2_10_no_replan_timeout.length
  );
  console.log(
    't_plansys2_10_no_replan_percentage',
    t_plansys2_10_no_replan_success.length / t_plansys2_10_no_replan.length
  );
  console.log(
    't_plansys2_10_no_replan_avg_task_time',
    t_plansys2_10_no_replan_avg_task_time
  );
  console.log(
    't_plansys2_10_no_replan_success_avg_task_time',
    t_plansys2_10_no_replan_success_avg_task_time
  );
  console.log(
    't_plansys2_10_no_replan_failed_avg_task_time',
    t_plansys2_10_no_replan_failed_avg_task_time
  );
  console.log(
    't_plansys2_10_no_replan_replan',
    t_plansys2_10_no_replan_replan.length
  );

  const t_plansys2_30_no_replan = results.filter(
    (trial) =>
      trial.name.split('_')[0] === 'plansys2' &&
      trial.name.split('_')[2] === '30' &&
      trial.name.split('_')[1] !== 'patrol'
  );
  const t_plansys2_30_no_replan_success = t_plansys2_30_no_replan.filter(
    (trial) => trial.status === 'Success'
  );
  const t_plansys2_30_no_replan_failed = t_plansys2_30_no_replan.filter(
    (trial) => trial.status === 'Failed'
  );
  const t_plansys2_30_no_replan_timeout = t_plansys2_30_no_replan.filter(
    (trial) => trial.task_time === false
  );
  const t_plansys2_30_no_replan_replan = t_plansys2_30_no_replan.filter(
    (trial) => trial.replan === 'Replan'
  );
  const t_plansys2_30_no_replan_avg_task_time =
    t_plansys2_30_no_replan.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_plansys2_30_no_replan.length;
  const t_plansys2_30_no_replan_success_avg_task_time =
    t_plansys2_30_no_replan_success.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_plansys2_30_no_replan_success.length;
  const t_plansys2_30_no_replan_failed_avg_task_time =
    t_plansys2_30_no_replan_failed.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_plansys2_30_no_replan_failed.length;
  console.log(
    't_plansys2_30_no_replan_success',
    t_plansys2_30_no_replan_success.length
  );
  console.log(
    't_plansys2_30_no_replan_failed',
    t_plansys2_30_no_replan_failed.length
  );
  console.log(
    't_plansys2_30_no_replan_timeout',
    t_plansys2_30_no_replan_timeout.length
  );
  console.log(
    't_plansys2_30_no_replan_percentage',
    t_plansys2_30_no_replan_success.length / t_plansys2_30_no_replan.length
  );
  console.log(
    't_plansys2_30_no_replan_avg_task_time',
    t_plansys2_30_no_replan_avg_task_time
  );
  console.log(
    't_plansys2_30_no_replan_success_avg_task_time',
    t_plansys2_30_no_replan_success_avg_task_time
  );
  console.log(
    't_plansys2_30_no_replan_failed_avg_task_time',
    t_plansys2_30_no_replan_failed_avg_task_time
  );
  console.log(
    't_plansys2_30_no_replan_replan',
    t_plansys2_30_no_replan_replan.length
  );

  const t_plansys2_50_no_replan = results.filter(
    (trial) =>
      trial.name.split('_')[0] === 'plansys2' &&
      trial.name.split('_')[2] === '50' &&
      trial.name.split('_')[1] !== 'patrol'
  );
  const t_plansys2_50_no_replan_success = t_plansys2_50_no_replan.filter(
    (trial) => trial.status === 'Success'
  );
  const t_plansys2_50_no_replan_failed = t_plansys2_50_no_replan.filter(
    (trial) => trial.status === 'Failed'
  );
  const t_plansys2_50_no_replan_timeout = t_plansys2_50_no_replan.filter(
    (trial) => trial.task_time === false
  );
  const t_plansys2_50_no_replan_replan = t_plansys2_50_no_replan.filter(
    (trial) => trial.replan === 'Replan'
  );
  const t_plansys2_50_no_replan_avg_task_time =
    t_plansys2_50_no_replan.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_plansys2_50_no_replan.length;
  const t_plansys2_50_no_replan_success_avg_task_time =
    t_plansys2_50_no_replan_success.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_plansys2_50_no_replan_success.length;
  const t_plansys2_50_no_replan_failed_avg_task_time =
    t_plansys2_50_no_replan_failed.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_plansys2_50_no_replan_failed.length;
  console.log(
    't_plansys2_50_no_replan_success',
    t_plansys2_50_no_replan_success.length
  );
  console.log(
    't_plansys2_50_no_replan_failed',
    t_plansys2_50_no_replan_failed.length
  );
  console.log(
    't_plansys2_50_no_replan_timeout',
    t_plansys2_50_no_replan_timeout.length
  );
  console.log(
    't_plansys2_50_no_replan_percentage',
    t_plansys2_50_no_replan_success.length / t_plansys2_50_no_replan.length
  );
  console.log(
    't_plansys2_50_no_replan_avg_task_time',
    t_plansys2_50_no_replan_avg_task_time
  );
  console.log(
    't_plansys2_50_no_replan_success_avg_task_time',
    t_plansys2_50_no_replan_success_avg_task_time
  );
  console.log(
    't_plansys2_50_no_replan_failed_avg_task_time',
    t_plansys2_50_no_replan_failed_avg_task_time
  );
  console.log(
    't_plansys2_50_no_replan_replan',
    t_plansys2_50_no_replan_replan.length
  );

  const t_plansys2_70_no_replan = results.filter(
    (trial) =>
      trial.name.split('_')[0] === 'plansys2' &&
      trial.name.split('_')[2] === '70' &&
      trial.name.split('_')[1] !== 'patrol'
  );
  const t_plansys2_70_no_replan_success = t_plansys2_70_no_replan.filter(
    (trial) => trial.status === 'Success'
  );
  const t_plansys2_70_no_replan_failed = t_plansys2_70_no_replan.filter(
    (trial) => trial.status === 'Failed'
  );
  const t_plansys2_70_no_replan_timeout = t_plansys2_70_no_replan.filter(
    (trial) => trial.task_time === false
  );
  const t_plansys2_70_no_replan_replan = t_plansys2_70_no_replan.filter(
    (trial) => trial.replan === 'Replan'
  );
  const t_plansys2_70_no_replan_avg_task_time =
    t_plansys2_70_no_replan.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_plansys2_70_no_replan.length;
  const t_plansys2_70_no_replan_success_avg_task_time =
    t_plansys2_70_no_replan_success.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_plansys2_70_no_replan_success.length;
  const t_plansys2_70_no_replan_failed_avg_task_time =
    t_plansys2_70_no_replan_failed.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_plansys2_70_no_replan_failed.length;
  console.log(
    't_plansys2_70_no_replan_success',
    t_plansys2_70_no_replan_success.length
  );
  console.log(
    't_plansys2_70_no_replan_failed',
    t_plansys2_70_no_replan_failed.length
  );
  console.log(
    't_plansys2_70_no_replan_timeout',
    t_plansys2_70_no_replan_timeout.length
  );
  console.log(
    't_plansys2_70_no_replan_percentage',
    t_plansys2_70_no_replan_success.length / t_plansys2_70_no_replan.length
  );
  console.log(
    't_plansys2_70_no_replan_avg_task_time',
    t_plansys2_70_no_replan_avg_task_time
  );
  console.log(
    't_plansys2_70_no_replan_success_avg_task_time',
    t_plansys2_70_no_replan_success_avg_task_time
  );
  console.log(
    't_plansys2_70_no_replan_failed_avg_task_time',
    t_plansys2_70_no_replan_failed_avg_task_time
  );
  console.log(
    't_plansys2_70_no_replan_replan',
    t_plansys2_70_no_replan_replan.length
  );

  const t_plansys2_patrol = results.filter(
    (trial) =>
      trial.name.split('_')[0] === 'plansys2' &&
      trial.name.split('_')[1] === 'patrol'
  );
  const t_plansys2_patrol_success = t_plansys2_patrol.filter(
    (trial) => trial.status === 'Success'
  );
  const t_plansys2_patrol_failed = t_plansys2_patrol.filter(
    (trial) => trial.status === 'Failed'
  );
  const t_plansys2_patrol_timeout = t_plansys2_patrol.filter(
    (trial) => trial.task_time === false
  );
  const t_plansys2_patrol_avg_task_time =
    t_plansys2_patrol.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_plansys2_patrol.length;
  const t_plansys2_patrol_success_avg_task_time =
    t_plansys2_patrol_success.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_plansys2_patrol_success.length;
  const t_plansys2_patrol_failed_avg_task_time =
    t_plansys2_patrol_failed.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_plansys2_patrol_failed.length;
  console.log(
    't_plansys2_patrol_success',
    t_plansys2_patrol_success.length
  );
  console.log(
    't_plansys2_patrol_failed',
    t_plansys2_patrol_failed.length
  );
  console.log(
    't_plansys2_patrol_timeout',
    t_plansys2_patrol_timeout.length
  );
  console.log(
    't_plansys2_patrol_percentage',
    t_plansys2_patrol_success.length / t_plansys2_patrol.length
  );
  console.log(
    't_plansys2_patrol_avg_task_time',
    t_plansys2_patrol_avg_task_time
  );
  console.log(
    't_plansys2_patrol_success_avg_task_time',
    t_plansys2_patrol_success_avg_task_time
  );
  console.log(
    't_plansys2_patrol_failed_avg_task_time',
    t_plansys2_patrol_failed_avg_task_time
  );

  const t_murosa_plan_patrol = results.filter(
    (trial) =>
      trial.name.split('_')[0] === 'murosaplan' &&
      trial.name.split('_')[1] === 'patrol'
  );
  const t_murosa_plan_patrol_success = t_murosa_plan_patrol.filter(
    (trial) => trial.status === 'Success'
  );
  const t_murosa_plan_patrol_failed = t_murosa_plan_patrol.filter(
    (trial) => trial.status === 'Failed'
  );
  const t_murosa_plan_patrol_timeout = t_murosa_plan_patrol.filter(
    (trial) => trial.task_time === false
  );
  const t_murosa_plan_patrol_avg_task_time =
    t_murosa_plan_patrol.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_murosa_plan_patrol.length;
  const t_murosa_plan_patrol_success_avg_task_time =
    t_murosa_plan_patrol_success.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_murosa_plan_patrol_success.length;
  const t_murosa_plan_patrol_failed_avg_task_time =
    t_murosa_plan_patrol_failed.reduce((acc, current) => {
      acc = acc + current.task_time;
      return acc;
    }, 0) / t_murosa_plan_patrol_failed.length;
  console.log(
    't_murosa_plan_patrol_success',
    t_murosa_plan_patrol_success.length
  );
  console.log(
    't_murosa_plan_patrol_failed',
    t_murosa_plan_patrol_failed.length
  );
  console.log(
    't_murosa_plan_patrol_timeout',
    t_murosa_plan_patrol_timeout.length
  );
  console.log(
    't_murosa_plan_patrol_percentage',
    t_murosa_plan_patrol_success.length / t_murosa_plan_patrol.length
  );
  console.log(
    't_murosa_plan_patrol_avg_task_time',
    t_murosa_plan_patrol_avg_task_time
  );
  console.log(
    't_murosa_plan_patrol_success_avg_task_time',
    t_murosa_plan_patrol_success_avg_task_time
  );
  console.log(
    't_murosa_plan_patrol_failed_avg_task_time',
    t_murosa_plan_patrol_failed_avg_task_time
  );
});
