# React Native boiler plate

This repository is for people who want to launch `React Native` app with the following features.

- Typescript
- TailwindCSS
- Redux

※ This app is developed by `Expo`. I will explain all of things on the premise
of using `Expo`.

# Introduction

This repository depends on my thoghts which I think I want to know at first.
So you may be complicated what `imageProvider`, `styleProvider` are?

I'll write down some points that you should see this files or don't have to see.

Let's get started!

# Prerequisities

- You have a basic knowledge of mobile application development.
- You have a basic knowledge of Javascript/Typescript.
- You have a basic knowledge about `node` (we will often use `npm` commands)

## Typescript(Should)

Once you clone this repository, you are about to start developping `React Native`
with Typescript. You only need to execute the below in app route directory.

```
sudo npm install
```

After that you can develop with Typescript!

## TailwindCSS

This boilerplate have already made configurations, which you can see `tailwind.confing.js`.

This configration file has a role to define what files should be rendered by TailwindCSS.

Let you add paths as following exisitng file paths.

Of cource you can apply styles by normal css by using a style attribute.

## Redux

What you have to see is

- `Counter.tsx`: UI component

- `counterSlice.ts`: It contains `action` and `reducer` in slice. Slicer is an expanded notion in React.
  Basically you write logics down in the slice.

- `store.ts`: `store` is the place to keep global states. When you add the reducer you have to add exported one
  and configure like the below.

```typescript
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

- `hooks.ts`: When you start to use Redux you have to define something in them.
  But minimum settings are already done.
