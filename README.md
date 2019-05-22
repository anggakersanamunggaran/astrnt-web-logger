## Version
0.0.4

## Description
Simple web event tracker for astronaut web application

## Install
```
// Format
npm install "git+ssh://git@gitlab.astrnt.co:backend-web/web-logger.git#<branch|tag>"

// sample install with tag 0.0.4
npm install "git+ssh://git@gitlab.astrnt.co:backend-web/web-logger.git#0.0.4"
```

## Sample usage

#### Import
```
import * as Logger from 'astrnt-web-logger'
```

#### First time initialization (Ideally on the intro page)
```
const env = 'beta'
const baseParam = {
    interview_code: 'TEST-123', // string
    candidate_id: 1111, // number
    job_id: 2222, // number
    company_id: 3333 // number
}

Logger.initialize(env, baseParam)
```

#### Track the event
```
const params = {
    event: 'Some event', // string
    message: 'Capture on first video' // string
}

Logger.recordEvent(params)
```

#### Promise support
```
...

Logger.recordEvent(params)
    .then(result => {
        console.log(`result : ${result}`)
    })
    .catch(err => {
        console.log(`error : ${err}`)
    })
```

#### Credit
- Checking
- Thinking
- Swimming
- Fast typing
- Awesome
https://github.com/zambelz48
