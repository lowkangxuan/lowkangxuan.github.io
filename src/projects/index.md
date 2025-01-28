---
layout: project.njk
title: Projects
icon: ⚒
pagination:
    data: collections.projects
    size: 5
    reverse: true
    alias: projects
permalink: "projects/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber + 1 }}/{% endif %}index.html"
---

## Projects
All the fun little things I have done during my free time.

<div class="project-list d-flex flex-column justify-content-center gap-3 py-4 pt-3">
    {% for project in projects -%}
        {%- if {{loop.index0}} == 0 -%}
        <span>hi</span>
        {%- endif -%}
        <article class="project-box p-exclude">
            <div class="project-box-info">
                <h5>{{project.data.icon}} {{project.data.title}}</h5>
                <p class="project-description mt-0 mb-0 ff-firacode">{{project.data.description}}</p>
            </div>
            {%- if project.data.thumbnail -%}
            <div class="project-box-thumbnail">
                <img src="{{project.url}}/{{project.data.thumbnail}}"></img>
            </div>
            {%- endif -%}
            <a href="{% if project.data.url -%} {{project.data.url}} {%- else -%} {{project.url}} {%- endif %}" class="entry-link"></a>
        </article>
    {%- endfor %}
</div>