---
layout: project.njk
submain: altmain
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

<div class="project-gallery py-4 pt-3">
    {% for i in range(1, 4) -%}
        {%- set ToGet = i -%}
        <div class="project-row">
            {% for project in projects -%}
                {%- if loop.index == ToGet -%}
                <div class="project-box p-exclude">
                    {%- if project.data.thumbnail -%}
                    <div class="project-box-thumbnail">
                        <img src="{{project.url}}/{{project.data.thumbnail}}"></img>
                    </div>
                    {%- endif -%}
                    <div class="project-box-info">
                        <header class="ff-firacode">{{project.data.title}}</header>
                        {%- if project.data.description -%}<section class="project-description my-0 ff-firacode">{{project.data.description}}</section> {%- endif -%}
                    </div>
                    <a href="{% if project.data.url -%} {{project.data.url}} {%- else -%} {{project.url}} {%- endif %}" class="entry-link"></a>
                </div>
                {%- set ToGet = ToGet + 3 -%}
                {%- endif -%}
            {%- endfor %}
        </div>
    {%- endfor %}
</div>