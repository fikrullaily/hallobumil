import React from "react";

function slider() {
  return (
    <>
      <div>
        <div className="CSSgal">
          <s id="s1"></s>
          <s id="s2"></s>
          <s id="s3"></s>
          <s id="s4"></s>

          <div className="slider">
            <div style={{ background: "#5b8" }}>
              <h2>
                PURE <b>CSS</b> SLIDESHOW
              </h2>
              <p>
                Responsive Slideshow Gallery created using CSS only <br /> by
                Roko
              </p>
            </div>
            <div style={{ background: "#85b" }}>
              <div>
                <h2>Slide 2</h2>
                <p>
                  Lorem Mollit labore proident amet consectetur ex aute
                  cupidatat ipsum ut ad occaecat aute. Lorem velit labore irure
                  adipisicing commodo excepteur tempor. Reprehenderit enim enim
                  eu fugiat anim est laboris deserunt id. Eiusmod aliqua
                  consequat nostrud nisi enim non ea qui mollit nulla. Cillum
                  qui commodo in irure officia incididunt quis esse ullamco elit
                  magna. Minim anim dolore commodo dolore culpa incididunt
                  laboris irure tempor cillum quis.
                </p>
              </div>
            </div>
            <div style={{ background: "#e95" }}>
              <h2>Slide 3</h2>
            </div>
            <div style={{ background: "#e59" }}>
              <h2>Slide 4</h2>
            </div>
          </div>

          <div className="prevNext">
            <div>
              <a href="#s4"></a>
              <a href="#s2"></a>
            </div>
            <div>
              <a href="#s1"></a>
              <a href="#s3"></a>
            </div>
            <div>
              <a href="#s2"></a>
              <a href="#s4"></a>
            </div>
            <div>
              <a href="#s3"></a>
              <a href="#s1"></a>
            </div>
          </div>

          <div className="bullets">
            <a href="#s1">1</a>
            <a href="#s2">2</a>
            <a href="#s3">3</a>
            <a href="#s4">4</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default slider;
