const fs = require('fs');

fs.readFile('result.json', (err, data) => {
    if (err) throw err;
    let results = JSON.parse(data);
    const t_10_replan = results.filter(trial => trial.name.split('_')[1] === '10' && trial.name.split('_')[2] !== 'no');
    const t_10_replan_success = t_10_replan.filter(trial => trial.status === 'Success')
    const t_10_replan_failed = t_10_replan.filter(trial => trial.status === 'Failed')
    const t_10_replan_timeout = t_10_replan.filter(trial => trial.task_time === false)
    const t_10_replan_avg_task_time = t_10_replan.reduce((acc, current) => {
        acc = acc + current.task_time
        return acc
    }, 0) / t_10_replan.length;
    const t_10_replan_success_avg_task_time = t_10_replan_success.reduce((acc, current) => {
        acc = acc + current.task_time
        return acc
    }, 0) / t_10_replan_success.length;
    const t_10_replan_failed_avg_task_time = t_10_replan_failed.reduce((acc, current) => {
        acc = acc + current.task_time
        return acc
    }, 0) / t_10_replan_failed.length;
    console.log('t_10_replan_success', t_10_replan_success.length);
    console.log('t_10_replan_failed', t_10_replan_failed.length);
    console.log('t_10_replan_timeout', t_10_replan_timeout.length);
    console.log('t_10_replan_percentage',  t_10_replan_success.length/t_10_replan.length);
    console.log('t_10_replan_avg_task_time', t_10_replan_avg_task_time);
    console.log('t_10_replan_success_avg_task_time', t_10_replan_success_avg_task_time);
    console.log('t_10_replan_failed_avg_task_time', t_10_replan_failed_avg_task_time);

    const t_30_replan = results.filter(trial => trial.name.split('_')[1] === '30' && trial.name.split('_')[2] !== 'no');
    const t_30_replan_success = t_30_replan.filter(trial => trial.status === 'Success')
    const t_30_replan_failed = t_30_replan.filter(trial => trial.status === 'Failed')
    const t_30_replan_timeout = t_30_replan.filter(trial => trial.task_time === false)
    const t_30_replan_avg_task_time = t_30_replan.reduce((acc, current) => {
        acc = acc + current.task_time
        return acc
    }, 0) / t_30_replan.length;
    const t_30_replan_success_avg_task_time = t_30_replan_success.reduce((acc, current) => {
        acc = acc + current.task_time
        return acc
    }, 0) / t_30_replan_success.length;
    const t_30_replan_failed_avg_task_time = t_30_replan_failed.reduce((acc, current) => {
        acc = acc + current.task_time
        return acc
    }, 0) / t_30_replan_failed.length;
    console.log('t_30_replan_success', t_30_replan_success.length);
    console.log('t_30_replan_failed', t_30_replan_failed.length);
    console.log('t_30_replan_timeout', t_30_replan_timeout.length);
    console.log('t_30_replan_percentage',  t_30_replan_success.length/t_30_replan.length);
    console.log('t_30_replan_avg_task_time', t_30_replan_avg_task_time);
    console.log('t_30_replan_success_avg_task_time', t_30_replan_success_avg_task_time);
    console.log('t_30_replan_failed_avg_task_time', t_30_replan_failed_avg_task_time);

    const t_50_replan = results.filter(trial => trial.name.split('_')[1] === '50' && trial.name.split('_')[2] !== 'no');
    const t_50_replan_success = t_50_replan.filter(trial => trial.status === 'Success')
    const t_50_replan_failed = t_50_replan.filter(trial => trial.status === 'Failed')
    const t_50_replan_timeout = t_50_replan.filter(trial => trial.task_time === false)
    const t_50_replan_avg_task_time = t_50_replan.reduce((acc, current) => {
        acc = acc + current.task_time
        return acc
    }, 0) / t_50_replan.length;
    const t_50_replan_success_avg_task_time = t_50_replan_success.reduce((acc, current) => {
        acc = acc + current.task_time
        return acc
    }, 0) / t_50_replan_success.length;
    const t_50_replan_failed_avg_task_time = t_50_replan_failed.reduce((acc, current) => {
        acc = acc + current.task_time
        return acc
    }, 0) / t_50_replan_failed.length;
    console.log('t_50_replan_success', t_50_replan_success.length);
    console.log('t_50_replan_failed', t_50_replan_failed.length);
    console.log('t_50_replan_timeout', t_50_replan_timeout.length);
    console.log('t_50_replan_percentage',  t_50_replan_success.length/t_50_replan.length);
    console.log('t_50_replan_avg_task_time', t_50_replan_avg_task_time);
    console.log('t_50_replan_success_avg_task_time', t_50_replan_success_avg_task_time);
    console.log('t_50_replan_failed_avg_task_time', t_50_replan_failed_avg_task_time);

    const t_70_replan = results.filter(trial => trial.name.split('_')[1] === '70' && trial.name.split('_')[2] !== 'no');
    const t_70_replan_success = t_70_replan.filter(trial => trial.status === 'Success')
    const t_70_replan_failed = t_70_replan.filter(trial => trial.status === 'Failed')
    const t_70_replan_timeout = t_70_replan.filter(trial => trial.task_time === false)
    const t_70_replan_avg_task_time = t_70_replan.reduce((acc, current) => {
        acc = acc + current.task_time
        return acc
    }, 0) / t_70_replan.length;
    const t_70_replan_success_avg_task_time = t_70_replan_success.reduce((acc, current) => {
        acc = acc + current.task_time
        return acc
    }, 0) / t_70_replan_success.length;
    const t_70_replan_failed_avg_task_time = t_70_replan_failed.reduce((acc, current) => {
        acc = acc + current.task_time
        return acc
    }, 0) / t_70_replan_failed.length;
    console.log('t_70_replan_success', t_70_replan_success.length);
    console.log('t_70_replan_failed', t_70_replan_failed.length);
    console.log('t_70_replan_timeout', t_70_replan_timeout.length);
    console.log('t_70_replan_percentage',  t_70_replan_success.length/t_70_replan.length);
    console.log('t_70_replan_avg_task_time', t_70_replan_avg_task_time);
    console.log('t_70_replan_success_avg_task_time', t_70_replan_success_avg_task_time);
    console.log('t_70_replan_failed_avg_task_time', t_70_replan_failed_avg_task_time);

    const t_10_no_replan = results.filter(trial => trial.name.split('_')[1] === '10' && trial.name.split('_')[2] === 'no');
    const t_10_no_replan_success = t_10_no_replan.filter(trial => trial.status === 'Success')
    const t_10_no_replan_failed = t_10_no_replan.filter(trial => trial.status === 'Failed')
    const t_10_no_replan_timeout = t_10_no_replan.filter(trial => trial.task_time === false)
    const t_10_no_replan_avg_task_time = t_10_no_replan.reduce((acc, current) => {
        acc = acc + current.task_time
        return acc
    }, 0) / t_10_no_replan.length;
    const t_10_no_replan_success_avg_task_time = t_10_no_replan_success.reduce((acc, current) => {
        acc = acc + current.task_time
        return acc
    }, 0) / t_10_no_replan_success.length;
    const t_10_no_replan_failed_avg_task_time = t_10_no_replan_failed.reduce((acc, current) => {
        acc = acc + current.task_time
        return acc
    }, 0) / t_10_no_replan_failed.length;
    console.log('t_10_no_replan_success', t_10_no_replan_success.length);
    console.log('t_10_no_replan_failed', t_10_no_replan_failed.length);
    console.log('t_10_no_replan_timeout', t_10_no_replan_timeout.length);
    console.log('t_10_no_replan_percentage',  t_10_no_replan_success.length/t_10_no_replan.length);
    console.log('t_10_no_replan_avg_task_time', t_10_no_replan_avg_task_time);
    console.log('t_10_no_replan_success_avg_task_time', t_10_no_replan_success_avg_task_time);
    console.log('t_10_no_replan_failed_avg_task_time', t_10_no_replan_failed_avg_task_time);

    const t_30_no_replan = results.filter(trial => trial.name.split('_')[1] === '30' && trial.name.split('_')[2] === 'no');
    const t_30_no_replan_success = t_30_no_replan.filter(trial => trial.status === 'Success')
    const t_30_no_replan_failed = t_30_no_replan.filter(trial => trial.status === 'Failed')
    const t_30_no_replan_timeout = t_30_no_replan.filter(trial => trial.task_time === false)
    const t_30_no_replan_avg_task_time = t_30_no_replan.reduce((acc, current) => {
        acc = acc + current.task_time
        return acc
    }, 0) / t_30_no_replan.length;
    const t_30_no_replan_success_avg_task_time = t_30_no_replan_success.reduce((acc, current) => {
        acc = acc + current.task_time
        return acc
    }, 0) / t_30_no_replan_success.length;
    const t_30_no_replan_failed_avg_task_time = t_30_no_replan_failed.reduce((acc, current) => {
        acc = acc + current.task_time
        return acc
    }, 0) / t_30_no_replan_failed.length;
    console.log('t_30_no_replan_success', t_30_no_replan_success.length);
    console.log('t_30_no_replan_failed', t_30_no_replan_failed.length);
    console.log('t_30_no_replan_timeout', t_30_no_replan_timeout.length);
    console.log('t_30_no_replan_percentage',  t_30_no_replan_success.length/t_30_no_replan.length);
    console.log('t_30_no_replan_avg_task_time', t_30_no_replan_avg_task_time);
    console.log('t_30_no_replan_success_avg_task_time', t_30_no_replan_success_avg_task_time);
    console.log('t_30_no_replan_failed_avg_task_time', t_30_no_replan_failed_avg_task_time);

    const t_50_no_replan = results.filter(trial => trial.name.split('_')[1] === '50' && trial.name.split('_')[2] === 'no');
    const t_50_no_replan_success = t_50_no_replan.filter(trial => trial.status === 'Success')
    const t_50_no_replan_failed = t_50_no_replan.filter(trial => trial.status === 'Failed')
    const t_50_no_replan_timeout = t_50_no_replan.filter(trial => trial.task_time === false)
    const t_50_no_replan_avg_task_time = t_50_no_replan.reduce((acc, current) => {
        acc = acc + current.task_time
        return acc
    }, 0) / t_50_no_replan.length;
    const t_50_no_replan_success_avg_task_time = t_50_no_replan_success.reduce((acc, current) => {
        acc = acc + current.task_time
        return acc
    }, 0) / t_50_no_replan_success.length;
    const t_50_no_replan_failed_avg_task_time = t_50_no_replan_failed.reduce((acc, current) => {
        acc = acc + current.task_time
        return acc
    }, 0) / t_50_no_replan_failed.length;
    console.log('t_50_no_replan_success', t_50_no_replan_success.length);
    console.log('t_50_no_replan_failed', t_50_no_replan_failed.length);
    console.log('t_50_no_replan_timeout', t_50_no_replan_timeout.length);
    console.log('t_50_no_replan_percentage',  t_50_no_replan_success.length/t_50_no_replan.length);
    console.log('t_50_no_replan_avg_task_time', t_50_no_replan_avg_task_time);
    console.log('t_50_no_replan_success_avg_task_time', t_50_no_replan_success_avg_task_time);
    console.log('t_50_no_replan_failed_avg_task_time', t_50_no_replan_failed_avg_task_time);

    const t_70_no_replan = results.filter(trial => trial.name.split('_')[1] === '70' && trial.name.split('_')[2] === 'no');
    const t_70_no_replan_success = t_70_no_replan.filter(trial => trial.status === 'Success')
    const t_70_no_replan_failed = t_70_no_replan.filter(trial => trial.status === 'Failed')
    const t_70_no_replan_timeout = t_70_no_replan.filter(trial => trial.task_time === false)
    const t_70_no_replan_avg_task_time = t_70_no_replan.reduce((acc, current) => {
        acc = acc + current.task_time
        return acc
    }, 0) / t_70_no_replan.length;
    const t_70_no_replan_success_avg_task_time = t_70_no_replan_success.reduce((acc, current) => {
        acc = acc + current.task_time
        return acc
    }, 0) / t_70_no_replan_success.length;
    const t_70_no_replan_failed_avg_task_time = t_70_no_replan_failed.reduce((acc, current) => {
        acc = acc + current.task_time
        return acc
    }, 0) / t_70_no_replan_failed.length;
    console.log('t_70_no_replan_success', t_70_no_replan_success.length);
    console.log('t_70_no_replan_failed', t_70_no_replan_failed.length);
    console.log('t_70_no_replan_timeout', t_70_no_replan_timeout.length);
    console.log('t_70_no_replan_percentage',  t_70_no_replan_success.length/t_70_no_replan.length);
    console.log('t_70_no_replan_avg_task_time', t_70_no_replan_avg_task_time);
    console.log('t_70_no_replan_success_avg_task_time', t_70_no_replan_success_avg_task_time);
    console.log('t_70_no_replan_failed_avg_task_time', t_70_no_replan_failed_avg_task_time);

    console.log('t_30_replan', t_30_replan);
});
