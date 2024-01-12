---
layout: contact.njk
title: Contact
icon: 🤙
---
## Contact Me
Have any questions? Feel free to contact me through any of these social platforms :)

<div class="p-exclude">
    {%- for social in socials.datas -%}
        <p><a href="{{social.url}}">{{social.text}}</a></p>
    {%- endfor -%}
</div>
