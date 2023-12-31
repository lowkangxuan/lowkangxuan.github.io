---
icon: 📦
title: 3D Lighthouse Island Environment
description: Lighthouse Island environment with modular pieces modeled and textured in Maya and Substance Painter. Environment built in Unity
started: 20/10/2021
date: 2021-12-01
tags:
 - "2021"
 - projects
 - 3D
 - breakdown
---

## Introduction
This Lighthouse Island Environment was created as part of my Year 2.2 module assignment, 3D Environment(3DE), where I was tasked to create this environment using modular models

## Snapshots

## Breakdown
I will now do a breakdown on how certain parts of this environment is built.

### Island Terrain
When creating the overall terrain for the island, I decided to sculpt the terrain itself in Unity using the <mark>Terrain Tool</mark> and texture it using <mark>Vertex Colors</mark>.

#### Sculpting
As mentioned above, the terrain itself is sculpted in Unity itself. After sculpting the island, I exported the mesh to <mark>ZBrush</mark> where I retopologized it to ensure the individual faces are proportional.

I then exported the retopologized mesh into <mark>Maya</mark> where I spent a couple of hours unwrapping the UVs just so that textures applied to the mesh would not look distorted.

#### Texturing

### Lighthouse
The lighthouse itself was modeled normally with multiple references to real-life lighthouse I've managed to find online.

I then added a <mark>Spotlight</mark> in Unity which rotates in a clockwise manner during runtime. This small little touch adds on to the overall experience where it would show the player that the lighthouse itself is still functioning and working well.

### Ocean Shader