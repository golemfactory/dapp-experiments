
# Response time measurements summary

This document present data and conclusions from response time measurements gathered using following config

```yaml
yagna:
  ...
  subnet_tag: "public"

payment:
  ...
  driver: "erc20"
  network: "goerli"
```

Related issue: [Measure example app's response times #233](https://github.com/golemfactory/yagna-sdk-team/issues/233)

## Baseline

Baseline was defined by taking the same method of measure using local instance on Weather Stats App run on docker compose

- local only request: ~5ms (4ms-20ms deviation)
- including request to external api: ~250ms (100ms-700ms deviation)

## Measurements

Measurements data and charts can be found in this [sheet](https://docs.google.com/spreadsheets/d/1HO6yBFRVkJvpfatcTLDSnqjXbwEMDShlo5eg311VOrI/edit?usp=sharing)

Every first request after starting dApp was longer by average of **4s** than following requests on particular set of providers

### Outbound

When testing Weather Stats app with outbound feature it often yielded timeouts. There also were instances of requests finishing successfully but after time between 5 and 60 seconds. Requests which exceeded 60s resulted in timeouts.

![with-outbound](https://user-images.githubusercontent.com/11493087/210322749-8276d541-0ce0-4fd9-9124-c4ee1e79c887.png)

Following charts presents the same data but excludes requests that exceeded 5s response time.

Response times: ~1s(0.6s-1.5s deviation)

![with-outbound-no-timeouts](https://user-images.githubusercontent.com/11493087/210322852-fb8bcbbf-b7b6-4ace-9e1f-d187ab026247.png)

### Without outbound

Two groups of responses were observed

- I response times: ~500ms(400ms-1s deviation)
- II response times: ~900ms(800ms-2s deviation)

Values are depended on randomly acquired providers

![without-outbound](https://user-images.githubusercontent.com/11493087/210322899-4dffb541-8d6b-4c64-99fc-e92eecac5de2.png)

## Conclusions

- First request after deply always has **~4s** of additional overhead
- Common overhead of **~0.5s-1s** was observed
- Used network offer stable performance when **outbound** was not used.
- Outbound resulted in the same overhead but performance was not stable as requests often were finishing with a 60s timeout. (unknown reason of timeouts due to used method)
