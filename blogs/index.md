---
layout: blog.njk
submain: altmain
title: Blogs
icon: 📋
pagination:
    data: collections.blogs
    size: 5
    reverse: true
    alias: blogs
permalink: "blogs/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber + 1 }}/{% endif %}index.html"
---

## Blogs
The following list comprises the {{blogs.length}} blogs I have written.

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

<div class="blog-list py-4 pt-3">
    {% for blog in blogs -%}
        <article class="blog-box p-exclude {{ 'item-1' if loop.first }}">
            {%- if blog.data.thumbnail -%}
            <div class="blog-box-thumbnail">
                <img src="{{blog.url}}/{{blog.data.thumbnail}}"></img>
            </div>
            {%- endif -%}
            <div class="blog-box-info">
                <h5>{{blog.data.icon}} {{blog.data.title}}</h5>
                <p class="blog-description my-0 ff-firacode">{{blog.data.description}}</p>
                <div class="gap-1 align-items-center blog-tags">
                    {% for tag in blog.data.tags -%}
                        {% if tag != "blogs" -%}
                            <div class="tag tag-{{tag}}"><span>{{ tag }}</span></div>
                        {%- endif %}
                    {%- endfor %}
                </div>
            </div>
            <a href="{{blog.url}}" class="entry-link"></a>
        </article>
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


