---
layout: projectpages.njk
icon: 🔧
title: Recreating a Detail Patch Tool
description: Unity Tool inspired by Outer Wilds
started: 11/05/2022
date: 2022-05-11
tags:
 - "2022"
 - projects
 - programming
 - breakdown
---

## Introduction
After watching [The Art of Outer Wilds](https://www.youtube.com/watch?v=Ww12q6HsmJA) video as part of Unity Creator Spotlight, I was intrigued by one of the tools the developers were using, the <mark>Detail Patch</mark> tool.

Essentially, the tool allowed the developers to place a group of foliage variants with a wide range of variety across planet surfaces as fast and easily as possible without needing to manually place or "paint" them onto the surface, which is extremely cumbersome. What's better is that they can easily tweak the variables to place different sets of foliage, as well as saving each variants as a mesh, allowing the developers to reuse them as much as possible.

## Breakdown
I found some time to challenge myself to recreate the tool as accurate as possible and here is the breakdown on how I did it.

The following scripts are created with its main functionality:
- hi

### DetailPatch.cs
Starting off, I created a script named `DetailPatch.cs`. This is the main script where we will be adding to an existing GameObject in the scene as a component.

```csharp
using UnityEngine;

[RequireComponent(typeof(MeshFilter))]
[RequireComponent (typeof(MeshRenderer))]
public class DetailPatch : MonoBehaviour
{
    public DetailInstance[] instances = new DetailInstance[0];
    public Vector2 size = new Vector2(0.5f, 1);
    public Quaternion savedRot;

    public int count;
    public int seed;
    public bool isBaked;
    public bool drawDebugLine;

    private void OnValidate()
    {
        if (size.x < 0 || size.y < 0)
        {
            size = Vector2.Max(Vector2.zero, size);
        }

        if (count < 0)
        {
            count = Mathf.Max(0, count);
        }
    }
}
```

I also ensure that the `MeshFilter` and `MeshRenderer` components are automatically added to the GameObject by using the `RequireComponent` attribute, more on these 2 components later on.

To prevent any errors with the distribution of the details, the `size` and the `count` variables are made to be always positive.

### DetailInstance.cs

### DetailPalette.cs

### DetailPrototype.cs

## Additional Resources
[Unity EditorWindow class](https://docs.unity3d.com/ScriptReference/EditorWindow.html)

[Unity SerializedObject class](https://docs.unity3d.com/ScriptReference/SerializedObject.html)

[Freya Holmér Intro to Tool Dev in Unity](https://youtu.be/pZ45O2hg_30)