import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import NavAdmin from "../components/NavAdmin";
import paperclip from "../assets/paperclip.png";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../config/api";
import imageProduct from "../assets/blankProduct.webp";

const styles={
  color: {
    backgroundColor : "rgba(97, 61, 43, 0.25)",
  }
}

export default function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    stock: "",
    price: "",
    desc: "",
    image: "",
  });

  const [viewLabel, setViewLabel] = useState(null);
  const [labelName, setLabelName] = useState("");
  const [addProduct, setAddproduct] = useState(false);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setViewLabel(url);
      setLabelName(e.target.files[0].name);
    }
  };

  let navigate = useNavigate();

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("title", form.title);
      // formData.set("stock", form.stock);
      formData.set("price", form.price);
      formData.set("desc", form.desc);
      console.log(form);

      const response = await API.post("/product", formData, config);
      console.log(response);

      navigate("/list-product");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div>
      <NavAdmin />
      <Container className="mt-5 pt-5">
        <h1 className="text-primer my-3">Add Product</h1>
        <Row>
          <Col>
            <Row>
              <Col xs={12} md={8} className="mb-2">
                <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      name="title"
                      id="title"
                      placeholder="Name"
                      className="mb-3"
                      style={styles.color}
                      onChange={handleChange}
                    />
                    {/* <Form.Control
                      type="number"
                      name="stock"
                      id="stock"
                      placeholder="Stock"
                      className="mb-3"
                      style={styles.color}
                      onChange={handleChange}
                    /> */}
                    <Form.Control
                      type="number"
                      name="price"
                      id="price"
                      placeholder="Price"
                      className="mb-3"
                      style={styles.color}
                      onChange={handleChange}
                    />
                    <Form.Control
                      as="textarea"
                      name="desc"
                      id="desc"
                      placeholder="Description Product"
                      className="mb-3"
                      rows={4}
                      style={styles.color}
                      onChange={handleChange}
                    />
                    <div
                      className="input-group  mb-4"
                      style={{ borderRadius: "5px" }}
                    >
                      <input
                        type="file"
                        className="form-control"
                        name="image"
                        id="inputgroupfile2"
                        placeholder="Photo Product"
                        onChange={handleChange}
                        hidden
                        required
                      />
                      <label
                        className="d-flex justify-content-between ai-center input-group-text form-box"
                        htmlFor="inputgroupfile2"
                        style={{ width: "50%", borderRadius: "5px",backgroundColor : "rgba(97, 61, 43, 0.25)" }}
                      >
                        {labelName === "" ? "Photo Product" : labelName}
                        <img src={paperclip} alt="" className="" />
                      </label>
                    </div>
                  </Form.Group>
                  <div style={{display:"flex", justifyContent:"center"}}>
                  <Button
                    className="btn-authlogin "
                    style={{ width: "50%" }}
                    type="submit"
                    >
                    Add Product
                  </Button>
                    </div>
                </Form>
              </Col>
              <Col xs={12} md={4} className="mb-2">
                {/* {viewLabel && ( */}
                <img
                  src={viewLabel || imageProduct}
                  alt="view"
                  style={{ width: "80%", borderRadius: "10px" }}
                />
                {/* )} */}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
