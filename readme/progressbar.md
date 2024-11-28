<div id="content">
{% for layout in parts %}
  {% if layout == "progress" %}
  <div style="display: inline-block; margin-top: 2px; margin-bottom: 2px; height: 5px; width: 100%;>
    <div id="prog" style="background: {{colour}}; width:{{progress}}%; height: 5px;"></div>
  </div>
  {% endif %}
{% endfor %}
</div>