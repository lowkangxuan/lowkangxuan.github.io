---
title: Projects
navhome: true
---

### Projects
Check out the list of projects I have developed over the past few years

<div class="d-flex flex-row gap-1">
    <span class="tag tag-2020"><a href="/tags/2020/">2020</a></span>
    <span class="tag tag-2021"><a href="/tags/2021/">2021</a></span>
    <span class="tag tag-2022"><a href="/tags/2022/">2022</a></span>
    <span class="tag tag-IP"><a href="/tags/IP/">IP</a></span>
</div>

<div class="project-list py-4 d-flex flex-column-reverse justify-content-center gap-4">
{% for project in collections.projects %}
<div class="project-box">
    <h5>{{project.data.icon}} {{project.data.title}}</h5>
    <p class="project-description mb-3">{{project.data.description}}</p>
    <div class="d-flex gap-1 align-items-center"><span style="font-size: 12px;">Tags: </span>{% for tag in project.data.tags %}{% if tag != "projects" %}<span class="tag tag-{{tag}}">{{ tag }}</span> {% endif %}{% endfor %}</div>
    <a href="{{project.url}}" class="entry-link"></a>
</div>
{% endfor %}
</div>

