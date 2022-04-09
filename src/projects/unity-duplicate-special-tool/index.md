---
layout: projectpages.njk
icon: 🔧
title: Developing a Duplicate Special Tool in Unity
description: Unity Tool inspired by Maya Duplicate Special Tool
started: 29/12/2022
date: 2021-12-29
tags:
 - "2021"
 - projects
 - programming
 - tools
---

## Introduction
For every school project I was assigned to, getting my hands on Maya and Unity is mandatory. My typical workflow is as follows — modeling and arranging my models in Maya to fit my liking before building the environment in Unity.

Because of how I am always going back and forth between Maya and Unity, I would often find myself lacking a tool when building my environment in Unity that I use a lot in Maya, the [Duplicate Special Tool](https://knowledge.autodesk.com/support/maya/learn-explore/caas/CloudHelp/cloudhelp/2018/ENU/Maya-Basics/files/GUID-961B262B-F882-452C-B6A9-1B7F3AD8E0FE-htm.html).

### What is Duplicate Special
In a nutshell, Duplicate Special is a tool where users can input any numeric values for <mark>Translate</mark>, <mark>Rotate</mark>, <mark>Scale</mark>, and <mark>No. of Instances</mark>. Clicking the "Apply" button would duplicate the selected object(s) x amount of times based on the "No. of copies" input with incremental translation, rotation, and scale. 

For example, a selected object with a translation of (2, 0, 0) and an input of `Translate: (3, 0, 0)` and `No. of Instances: 3`, clicking "Apply" would duplicate the object 3 times with 3 different translation, (5, 0, 0), (8, 0, 0), and (11, 0, 0).

## Features
- Easy to use
- Support for all 3 Transforms: `Position`, `Rotation`, `Scale`
- Displays holographic mesh if the selected gameObject has a mesh

## Development Process
The starting development process of this tool took me about over a week to complete, with additional features taking about 2 more weeks or so. 

### Initialization
I first included the namespace `UnityEditor` and inherited my script from `EditorWindow` instead of the default `MonoBehaviour`.
```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;

public class DuplicateSpecial : EditorWindow
{

}
```

I then wrote the following code to create a <mark>MenuItem</mark> under "Tools > Duplicate Special" which will create and display a window when clicked if there isn't an existing window already.
```csharp
[MenuItem("Tools/Duplicate Special %#D")]
private static void Init()
{
    GetWindow<SpecialDuplicate>();
}
```

### Variables
Next, I created a bunch of variables that would be used later on for creating input field for users to key in values.

```csharp
public GameObject parent;
private Material _previewMaterial;

// Default values for Transform
public Vector3 inputPosition;
public Vector3 inputRotation;
public Vector3 inputScale = new Vector3(1, 1, 1);
public int inputInstances;

// Serializing Stuff
SerializedObject _so;
SerializedProperty _propParent;
SerializedProperty _propPosition;
SerializedProperty _propRotation;
SerializedProperty _propScale;
SerializedProperty _propInstances;
```

The classes `SerializedObject` and `SerializedProperty` you see automatically handle dirtying individual serialized fields so they will be processed by the [Undo](https://docs.unity3d.com/ScriptReference/Undo.html) system and styled correctly for Prefab overrides when drawn in the Inspector.

### Opening and Closing window
I made use of the `OnEnable()` and `OnDisable()` functions to initialize or uninitialize certain stuff when the window is opened or closed.

```csharp
// When window is opened
private void OnEnable()
{
    Selection.selectionChanged += Repaint;
    SceneView.duringSceneGui += DuringSceneGUI;

    _previewMaterial = new Material(Shader.Find("Shader Graphs/PreviewMatShader"));

    _so = new SerializedObject(this);
    _propParent = _so.FindProperty("parent");
    _propPosition = _so.FindProperty("inputPosition");
    _propRotation = _so.FindProperty("inputRotation");
    _propScale = _so.FindProperty("inputScale");
    _propInstances = _so.FindProperty("inputInstances");
}

// When window is closed
private void OnDisable()
{
    Selection.selectionChanged -= Repaint;
    SceneView.duringSceneGui -= DuringSceneGUI;

    DestroyImmediate(_previewMaterial);
}
```

### Calculating Position
The function `CalculatePosition()` was created to help calculate the position that I need for each duplicated gameObject.

The overload function I created is for the hologram mesh that will be drawn on the Scene View based on the input field values. More on that below.

```csharp
// Calculate final position value based on x, y, z input parameter
private Vector3 CalculatePosition(float xPos, float yPos, float zPos)
{
    return new Vector3(inputPosition.x + xPos, inputPosition.y + yPos, inputPosition.z + zPos);
}

// (Overload) Calculate final position value based on x, y, z input parameter multiplied by index
private Vector3 CalculatePosition(float xPos, float yPos, float zPos, int index)
{
    return new Vector3((inputPosition.x * index) + xPos, (inputPosition.y * index) + yPos, (inputPosition.z * index) + zPos);
}
```

### Scene View GUI
I created a `DuringSceneGUI()` function which takes in a `SceneView` parameter in order for me to subscribe this function to the `SceneView.duringSceneGui` event.

I then used the `CalculatePosition()` overload function to determine the position of the preview mesh should be displayed at. I also created 2 variables, `finalRotation` and `finalScale`, and used these 2 variables together with the calculated position to make a standard 4x4 transformation matrix. Finally, the preview mesh is drawn with the `Graphics.DrawMeshNow()` function.

```csharp
// Scene View GUI
private void DuringSceneGUI(SceneView sceneView)
{
    if (inputInstances > 0)
    {
        foreach (GameObject go in Selection.gameObjects)
        {
            MeshFilter meshFilter = go.GetComponent<MeshFilter>();

            if (meshFilter != null)
            {
                Mesh mesh = meshFilter.sharedMesh;

                for (int i = 1; i <= inputInstances; i++)
                {
                    Vector3 finalPosition = CalculatePosition(go.transform.position.x, go.transform.position.y, go.transform.position.z, i);

                    float rotationX = (go.transform.localRotation.eulerAngles.x + inputRotation.x) * i;
                    float rotationY = (go.transform.localRotation.eulerAngles.y + inputRotation.y) * i;
                    float rotationZ = (go.transform.localRotation.eulerAngles.z + inputRotation.z) * i;
                    Vector3 finalRotation = new Vector3(rotationX, rotationY, rotationZ);

                    float scaleX = inputScale.x;
                    float scaleY = inputScale.y;
                    float scaleZ = inputScale.z;
                    Vector3 finalScale = new Vector3(scaleX, scaleY, scaleZ);

                    Matrix4x4 matrix = Matrix4x4.TRS(finalPosition, Quaternion.Euler(finalRotation), finalScale);

                    _previewMaterial.SetPass(0);
                    Graphics.DrawMeshNow(mesh, matrix);
                }
            }
        }
    }
}
```

### Editor Window GUI
The [OnGUI()](https://docs.unity3d.com/ScriptReference/EditorWindow.OnGUI.html) function is used to implement the GUI for the Editor Window such as the property field and <mark>Duplicate</mark> button. 

`SceneView.RepainAll()` is used to repaint the Scene View the moment a property field is modified. This ensures that the Scene View refreshes properly without any stuttering.

```csharp
// Editor Window GUI
private void OnGUI()
{
    _so.Update();

    EditorGUILayout.PropertyField(_propParent, new GUIContent("Parent"));
    
    EditorGUILayout.Space();

    EditorGUILayout.PropertyField(_propPosition, new GUIContent("Position"));
    EditorGUILayout.PropertyField(_propRotation, new GUIContent("Rotation"));
    EditorGUILayout.PropertyField(_propScale, new GUIContent("Scale"));
    EditorGUILayout.PropertyField(_propInstances, new GUIContent("No. of Instances"));

    EditorGUILayout.Space();
    
    // If properties are modified, repaint SceneView
    if (_so.ApplyModifiedProperties())
    {
        SceneView.RepaintAll();
    }
    
    // If only ONE gameObject is selected and No. of Instances input is greater than ZERO, enable button
    // else disable button
    using (new EditorGUI.DisabledScope(!((Selection.gameObjects.Length == 1) && (inputInstances > 0))))
    {
        if (GUILayout.Button("Duplicate"))
        {
            DuplicateObject();
        }
    }
}
```

### Duplicating the object
Finally, the function for duplicating the selected gameObject when the button is clicked. By iterating through the `inputInstances` variable, I can quickly duplicate the gameObject by using `Unsupported.DuplicateGameObjectsUsingPasteboard()`, which is a similar function used for your typical duplicate (`Edit > Duplicate`).

The position, rotation and scale of the duplicated object are then calculated based on their respective input field values, and as for the position, the `CalculatePosition()` function is used.

```csharp
// Function to duplicate selected objects
private void DuplicateObject()
{
    for (int i = 0; i < inputInstances; i++)
    {
        Unsupported.DuplicateGameObjectsUsingPasteboard();

        // Current duplicated object
        Transform currSelection = Selection.activeGameObject.transform;

        // Assigning scale to instantiated object
        float scaleX = inputScale.x;
        float scaleY = inputScale.y;
        float scaleZ = inputScale.z;

        currSelection.localPosition = CalculatePosition(currSelection.localPosition.x, currSelection.localPosition.y, currSelection.localPosition.z);
        currSelection.Rotate(new Vector3(inputRotation.x, inputRotation.y, inputRotation.z));
        currSelection.localScale = new Vector3(scaleX, scaleY, scaleZ);
    }
}
```

## Todo
With the tool itself still being early in development, there are list of potential features that I may implement into the tool itself in the future.

- Support for multiple object duplication
- Display preview mesh for selected object that has the `MeshRenderer` component in the child object(s) instead

## Additional Resources
[Unity EditorWindow class](https://docs.unity3d.com/ScriptReference/EditorWindow.html)

[Unity SerializedObject class](https://docs.unity3d.com/ScriptReference/SerializedObject.html)

[Freya Holmér Intro to Tool Dev in Unity](https://youtu.be/pZ45O2hg_30)