---
title: Projects
navhome: true
---

### Projects
Check out the list of projects I have developed over the past few years

<div class="project-list py-4 d-flex flex-column-reverse justify-content-center gap-4">
{% for project in collections.projects %}
<div class="project-box">
    <h5>{{project.data.icon}} {{project.data.title}}</h5>
    <p class="project-description">{{project.data.description}}</p>
    <div class="d-flex align-items-center"><span class="m-0 developed-date">{{project.data.started}} • </span>{% for tag in project.data.tags %}{% if tag == "projects" %}{% else %} <span class="tag tag-{{tag}}">{{ tag }}</span> {% endif %}{% endfor %}</div>
    <a href="{{project.url}}" class="entry-link"></a>
</div>
{% endfor %}
</div>

