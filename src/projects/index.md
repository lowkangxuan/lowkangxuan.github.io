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
Check out the list of projects I have developed over the past few years

<div class="d-flex flex-row flex-wrap gap-1 pt-4">
    {% for tag in collections.tagList -%}
        {% if tag == "2022" -%}
            <span class="tag tag-{{ tag }}"><a href="/tags/{{ tag }}/">{{ tag }}</a></span>
            <div style="flex-basis: 100%;"></div>
        {%- else -%}
            <span class="tag tag-{{ tag }}"><a href="/tags/{{ tag }}/">{{ tag }}</a></span>
        {%- endif %}
    {%- endfor %}
</div>

<div class="project-list d-flex flex-column justify-content-center gap-3 py-4 pt-3">
    {% for project in projects -%}
        <div class="project-box p-exclude">
            <h5>{{project.data.icon}} {{project.data.title}}</h5>
            <div class="my-2">
                <p class="project-description">{{project.data.description}}</p>
            </div>
            <div class="d-flex gap-1 align-items-center">
            {% for tag in project.data.tags -%}
                {% if tag != "projects" -%}
                    <span class="tag tag-{{tag}}">{{ tag }}</span>
                {%- endif %}
            {%- endfor %}</div>
            <a href="{{project.url}}" class="entry-link"></a>
        </div>
    {%- endfor %}
</div>

<div class="d-flex justify-content-between p-exclude" style="margin: 2rem 0 5.5rem 0">
    {%- if pagination.href.previous -%}
        <p><a href="{{pagination.href.previous}}">< Previous Page</a></p>
    {%- else -%}
        <div></div>
    {%- endif -%}
    {%- if pagination.href.next -%}
        <p><a href="{{pagination.href.next}}">Next Page ></a></p>
    {%- else -%}
        <div></div>
    {%- endif -%}
</div>


