this minimalist chrome extension reads and writes a localStorage key called `flipping` to manage flipping

```
{
  "FEATURE_NAME": {
    "development":true,
    "production":false,
    "stage":false
  },
  "OTHER_FEATURE_NAME": {
    "development":true,
    "production":false,
    "stage":false
  },
}
```

where `FEATURE_NAME` is the name of a feature, and `stage` is the name of the environment


---

## how to deploy

* update manifest version
* run `build.sh`
* upload the new zip (on your desktop) to the [google extension developer dashboard](https://chrome.google.com/webstore/developer/dashboard)
* publish it :-)

## how to run it locally

* [enable developer mode in your chrome extension panel](https://www.youtube.com/watch?v=vGxpOBnLzp8)
* drop the `src/` folder in this pane




