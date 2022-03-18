---
title: Projects
navhome: true
---

### Projects
Check out the list of projects I have developed over the past few years

<div class="d-flex flex-row flex-wrap gap-1">
    {% for tag in collections.tagList -%}
    {% if tag == "2022" -%}
        <span class="tag tag-{{ tag }}"><a href="/tags/{{ tag }}/">{{ tag }}</a></span>
        <div style="flex-basis: 100%;"></div>
    {%- else -%}
        <span class="tag tag-{{ tag }}"><a href="/tags/{{ tag }}/">{{ tag }}</a></span>
    {%- endif %}
    {%- endfor %}
</div>

<div class="project-list py-4 d-flex flex-column justify-content-center gap-4">
{% for project in collections.projects | reverse %}
<div class="project-box p-exclude">
    <h5>{{project.data.icon}} {{project.data.title}}</h5>
    <p class="project-description mb-3">{{project.data.description}}</p>
    <div class="d-flex gap-1 align-items-center"><span style="font-size: 12px;">Tags: </span>{% for tag in project.data.tags %}{% if tag != "projects" %}<span class="tag tag-{{tag}}">{{ tag }}</span> {% endif %}{% endfor %}</div>
    <a href="{{project.url}}" class="entry-link"></a>
</div>
{% endfor %}
</div>

