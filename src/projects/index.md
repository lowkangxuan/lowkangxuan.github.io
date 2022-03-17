---
title: Projects
navhome: true
---

### Projects
Check out the list of projects I have developed over the past few years

<div class="project-list py-4 d-flex flex-column-reverse justify-content-center gap-4">
{% for project in collections.projects | reverse %}
<div class="project-box">
    <h5>{{project.data.icon}} {{project.data.title}}</h5>
    <p>{{project.data.description}}</p>
    <p class="m-0 developed-date">{{project.data.started}}</p>
    <a href="{{project.url}}" class="entry-link"></a>
</div>
{% endfor %}
</div>

