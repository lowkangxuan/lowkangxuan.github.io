---
layout: home.njk
title: Kang Xuan
icon: 👋
---
## Hello!
I am Kang Xuan, a student who enjoys gaming and passionate in Game Development.

Currently residing in Singapore studying for a Diploma in Immersive Media at Ngee Ann Polytechnic.

## Over the Years
Find out what I have accomplished and what I am currently up to.

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