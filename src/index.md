---
layout: home.njk
title: Kang Xuan
icon: 👋
---
## Hello!
I am Kang Xuan, and I enjoy gaming and have a passion for game development.

## Over the Years
Discover my achievements and learn about what I am currently working on.

<div class="timeline p-exclude mt-5">
    <div class="timeline--content">
        <p><a href="https://twitter.com/k4ngg_">Let's explore my future together :D</a></p>
    </div>
    {% for info in timeline.infos -%}
    <div class="timeline--content  {%- if (loop.index % 2) != 0 %} left {%- endif %}">
        <div class="timeline--box">
            <span class="fw-bold">{{info.title}}</span>
            <span>{{info.position}}</span>
            <span style="font-size: small;">{{info.year}}</span>
        </div>
    </div>
    {%- endfor %}
</div>