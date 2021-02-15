Dig
===

Dig is a minimal platform built on Angular and Firebase that provides app containers that manage your app data and state. 

> Dig is designed to be used with Firebase, but this is not a requirements.

The container allows you to create a single point of truth and a common API for your app data which is automatically loaded from an array of sources:

* Observable: the container watches the Observable
* Promise: the container waits for the promise to resolve
* static: can be any type of data

Why
---

* Properly handling observable data is tricky and can cause expensive memory leaks; Dig detaches the data from the source, then listens for changes.
* Firebase optimistically synchronizes your data when you write, so you state can be read only, greatly simplifying state requirements.
* We were sick of writing boilerplate code to handle Observable data.

Installing Dig
--------------

```shell script
npm install @dig-platform/dig
```

```typescript
// app.module.ts
@NgModule({
  // ...
  imports: [
    // ...
    DigModule.forRoot({
      initialState: {
        title: 'Dig App Demo'
      }
    })
  ],
  // ...
})
export class AppModule { }
```

Reading Data
------------

You can read data as an observable stream:

```typescript
dig.app.getObservable('title').subscribe(title => {
  page.title = title;
});
```

Or get the current value:

```typescript
page.title = dig.app.getValue('title');
```

Setting Static Data
-------------------

```typescript
dig.app.set('title', 'New Title');
```

Setting Observable Data
-----------------------

You can pass any type of observable data to Dig, like this example using Firebase:

```typescript
const recentTests = afs.collection('tests', ref => ref.orderBy('createdAt', 'desc').limit(50)).valueChanges();
dig.app.set('recentTests', recentTests);
```
