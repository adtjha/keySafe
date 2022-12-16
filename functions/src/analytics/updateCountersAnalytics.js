
const { getFirestore, Timestamp } = require('firebase-admin/firestore');
const db = getFirestore();
// exports.verifyAnalytics = functions.https.onRequest(async (req, res) => {
//     /**
//      * Invoked when a new task is pushed queue,
//      * verifies if analytics from a known source, remove task if source unknown, put the ip in watchlist from where task created,
//      * prepares the data, for eg. removes all auth related data,
//      */
// })

/**
 * live (second)
 * hourly (3600 seconds) - second []
 * daily (24 hours) - hour []
 * weekly (7 days) - day []
 * monthly (x weeks in a month) - week []
//  * _quaterly (3 months)
//  * _half-yearly (6 months)
 * yearly (12 months) - month []
 * decade (10 years) - year []
 */

exports.updateCountersAnalytics = ({ task, session_id, customer_id, data, hash, createdAt, type, documentId }) => new Promise(async (resolve, reject) => {
    const { id, createdAt, name, retryReason, previousResponse, retryCount } = task;
    const customerId = customer_id;

    const customer = await db.collection('customers').doc(customerId).get();
    const analyticsRef = db.collection('customers').doc(customerId).collection('analytics');
    const analytic = await analyticsRef.doc(documentId).get();

    const secondRef = db.collection('customers').doc(customerId).collection('seconds');
    const minuteRef = db.collection('customers').doc(customerId).collection('minutes');
    const hourRef = db.collection('customers').doc(customerId).collection('hours');
    const dayRef = db.collection('customers').doc(customerId).collection('days');
    const monthRef = db.collection('customers').doc(customerId).collection('months');
    const yearRef = db.collection('customers').doc(customerId).collection('years');


    const analyticTime = analytic.createTime.toMillis();

    let analyticSecond = new Date(analyticTime).getSeconds(),
        analyticMinute = new Date(analyticTime).getMinutes(),
        analyticHour = new Date(analyticTime).getHours(),
        analyticDay = new Date(analyticTime).getDate(),
        analyticMonth = new Date(analyticTime).getMonth(),
        analyticYear = new Date(analyticTime).getFullYear();


    const nowThisSecond = new Date(Timestamp.now()).getSeconds();
    const nowThisMinute = new Date(Timestamp.now()).getMinutes();
    const nowThisHour = new Date(Timestamp.now()).getHours();
    const nowThisDay = new Date(Timestamp.now()).getDate();
    const nowThisMonth = new Date(Timestamp.now()).getMonth();
    const nowThisYear = new Date(Timestamp.now()).getFullYear();


    if (nowThisSecond !== analyticSecond) {
        const lastSecond = await analyticsRef.where('createdAt', '<', Timestamp.now()).where('createdAt', '>', Timestamp.now() - 1000).orderBy('createdAt', 'asc').get();
        let counter = {
            request: {
                query: [{
                    value: '',
                    count: 0,
                    percentage: 0.0
                }],
                params: [{
                    value: '',
                    count: 0,
                    percentage: 0.0
                }],
                baseUrl: [{
                    value: '',
                    count: 0,
                    percentage: 0.0
                }],
                originalUrl: [{
                    value: '',
                    count: 0,
                    percentage: 0.0
                }],
                _parsedUrl: [{
                    value: '',
                    count: 0,
                    percentage: 0.0
                }],
                url: [{
                    value: '',
                    count: 0,
                    percentage: 0.0
                }],
                method: [{
                    value: '',
                    count: 0,
                    percentage: 0.0
                }],
                statusCode: [{
                    value: '',
                    count: 0,
                    percentage: 0.0
                }],
                statusMessage: [{
                    value: '',
                    count: 0,
                    percentage: 0.0
                }],
                socket: {
                    bufferSize: [{
                        value: '',
                        count: 0,
                        percentage: 0.0
                    }],
                    bytesRead: [{
                        value: '',
                        count: 0,
                        percentage: 0.0
                    }],
                    bytesWritten: [{
                        value: '',
                        count: 0,
                        percentage: 0.0
                    }],
                    connecting: [{
                        value: '',
                        count: 0,
                        percentage: 0.0
                    }],
                    destroyed: [{
                        value: '',
                        count: 0,
                        percentage: 0.0
                    }],
                    localAddress: [{
                        value: '',
                        count: 0,
                        percentage: 0.0
                    }],
                    localPort: [{
                        value: '',
                        count: 0,
                        percentage: 0.0
                    }],
                    localFamily: [{
                        value: '',
                        count: 0,
                        percentage: 0.0
                    }],
                    readyState: [{
                        value: '',
                        count: 0,
                        percentage: 0.0
                    }],
                    remoteAddress: [{
                        value: '',
                        count: 0,
                        percentage: 0.0
                    }],
                    remoteFamily: [{
                        value: '',
                        count: 0,
                        percentage: 0.0
                    }],
                    remotePart: [{
                        value: '',
                        count: 0,
                        percentage: 0.0
                    }],
                    timeout: [{
                        value: '',
                        count: 0,
                        percentage: 0.0
                    }],
                },
                rawHeaders: [{
                    value: '',
                    count: 0,
                    percentage: 0.0
                }],
                httpVersionMajor: [{
                    value: '',
                    count: 0,
                    percentage: 0.0
                }],
                httpVersionMinor: [{
                    value: '',
                    count: 0,
                    percentage: 0.0
                }],
                httpVersion: [{
                    value: '',
                    count: 0,
                    percentage: 0.0
                }],
            },
            response: {
                status: [{
                    value: '',
                    count: 0,
                    percentage: 0.0
                }],
                body: [{
                    value: '',
                    count: 0,
                    percentage: 0.0
                }],
            },
            event: {
                state: [{
                    value: '',
                    count: 0,
                    percentage: 0.0
                }],
            }
        }

        if (!lastSecond.empty) {
            for (const doc of lastSecond.docs) {
                const count = doc.data()

            }
        }

        // secondRandomArray.push(latestRandomArray.reduce((a, b) => (parseFloat(a) + parseFloat(b)) * 0.5, 0))
        // updateChart(secondRandomArray, 'second')
        // latestRandomArray = []
        // thisSecond = nowThisSecond
    }

    if (nowThisMinute !== analyticMinute) {
        // minuteRandomArray.push(secondRandomArray.reduce((a, b) => (parseFloat(a) + parseFloat(b)) * 0.5, 0))
        // updateChart(minuteRandomArray, 'minute')
        // secondRandomArray = []
        // thisMinute = nowThisMinute
    }

    if (nowThisHour !== analyticHour) {
        // hourRandomArray.push(minuteRandomArray.reduce((a, b) => (parseFloat(a) + parseFloat(b)) * 0.5, 0))
        // updateChart(hourRandomArray, 'hour')
        // minuteRandomArray = []
        // thisHour = nowThisHour
    }

    if (nowThisDay !== analyticDay) {
        // dayRandomArray.push(hourRandomArray.reduce((a, b) => (parseFloat(a) + parseFloat(b)) * 0.5, 0))
        // updateChart(dayRandomArray, 'day')
        // hourRandomArray = []
        // thisDay = nowThisDay
    }

    if (nowThisMonth !== analyticMonth) {
        // monthRandomArray.push(dayRandomArray.reduce((a, b) => (parseFloat(a) + parseFloat(b)) * 0.5, 0))
        // updateChart(monthRandomArray, 'month')
        // dayRandomArray = []
        // thisMonth = nowThisMonth
    }

    if (nowThisYear !== analyticYear) {
        // yearRandomArray.push(monthRandomArray.reduce((a, b) => (parseFloat(a) + parseFloat(b)) * 0.5, 0))
        // updateChart(nowThisYear, 'year')
        // monthRandomArray = []
        // thisYear = nowThisYear
    }

    // this months data
    const docs = db.collection('customers').doc(customerId).collection('analytics').where('month', '==', new Date().getMonth());
    // get current-week, last-week,
    // get current-month, last-month,
    // get current-year, last-year, if change, update year's array, and calculate average of current-year (months array)
    /**
     * Invoked when a new update counter task is pushed queue,
     * its analytics data is already stored.
     * only cleansed data, to be passed on,
     * customer, collection, api, endpoint, user
     * update this hourly chart
     * update this day based on hourly chart,
     * update this week,
     * update this month,
     * update this quater,
     * update this year,
     * update inception (year-wise if account more than 5 years else month-wise),
     * should be transaction type.
     */
});
