---
layout: project.njk
title: Projects
icon: 📋
pagination:
    data: collections.projects
    size: 5
    reverse: true
    alias: projects
permalink: "projects/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber + 1 }}/{% endif %}index.html"
---

## Projects
All the fun little projects I have done over the past few years

<div class="d-flex flex-row flex-wrap gap-1 pt-4">
    {% for tag in collections.tagList -%}
        {% if tag == "2022" -%}
            <a href="/tags/{{ tag }}/" class="tag tag-{{ tag }}"><span>{{ tag }}</span></a>
            <div style="flex-basis: 100%;"></div>
        {%- else -%}
            <a href="/tags/{{ tag }}/" class="tag tag-{{ tag }}"><span>{{ tag }}</span></a>
        {%- endif %}
    {%- endfor %}
</div>

<div class="project-list d-flex flex-column justify-content-center gap-3 py-4 pt-3">
    {% for project in projects -%}
        <div class="project-box p-exclude">
            <div class="project-box-thumbnail">
                <img src="{{project.url}}/{{project.data.thumbnail}}"></img>
            </div>
            <div class="project-box-info">
                <h5>{{project.data.icon}} {{project.data.title}}</h5>
                <p class="project-description mt-1 mb-4 ff-firacode">{{project.data.description}}</p>
                <div class="d-flex flex-wrap gap-1 align-items-center">
                {% for tag in project.data.tags -%}
                    {% if tag != "projects" -%}
                        <div class="tag tag-{{tag}}"><span>{{ tag }}</span></div>
                    {%- endif %}
                {%- endfor %}</div>
                </div>
            <a href="{{project.url}}" class="entry-link"></a>
        </div>
    {%- endfor %}
</div>

<div class="d-flex justify-content-between p-exclude" style="margin: 1rem 0 5.5rem 0">
    {%- if pagination.href.previous -%}
        <p><a href="{{pagination.href.previous}}">< Previous</a></p>
    {%- else -%}
        <div></div>
    {%- endif -%}
    {%- if pagination.href.next -%}
        <p><a href="{{pagination.href.next}}">Next ></a></p>
    {%- else -%}
        <div></div>
    {%- endif -%}
</div>


