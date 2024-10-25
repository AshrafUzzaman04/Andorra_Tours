import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import callFetch from "helpers/callFetch";
import SoftEditor from "components/SoftEditor";

const BlogCreate = () => {
    const [description, setDescription] = useState("");
    const { t } = useTranslation();
    const [saving, setSaving] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [categories, setCategories] = useState([]);
    const [files, setFiles] = useState([]);
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [removedPhotos, setRemovedPhotos] = useState([])
    const inputRef = useRef(null);
    const today = new Date().toISOString().split("T")[0];
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm();

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setFiles([...files, file])
    };

    useEffect(() => {
        if (files) {
            const updatedFileList = new DataTransfer();
            files.forEach((file) => {
                updatedFileList.items.add(file);
            });
            setValue('images', updatedFileList.files);
            if (inputRef.current) {
                inputRef.current.value = '';
            }
        }
    }, [files])

    const handleDeleteFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleRemoveUploadedFile = (index) => {
        const photoToRemove = uploadedPhotos[index];
        setRemovedPhotos((prevRemovedPhotos) => {
            const updatedRemovedPhotos = [...prevRemovedPhotos, photoToRemove];
            setValue('remove_photos', updatedRemovedPhotos.join(','));
            return updatedRemovedPhotos;
        });
        setUploadedPhotos((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const onSubmit = (formData) => {
        setSaving(true);
        formData.description = description;
        callFetch("blogs", "POST", formData, setError).then((res) => {
            setSaving(false);
            if (!res.ok) return;
            setSubmitSuccess(true);
        });
    };
    return submitSuccess ? <Navigate to="/blogs" /> : (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>{t("Create Blog")}</h6>
                        </div>
                        <div className="card-body">
                            <form
                                className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""
                                    }`}
                                onSubmit={handleSubmit(onSubmit)}
                                noValidate
                                autoComplete="off"
                            >
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div class="form-group">
                                            <div class="form-group w-100">
                                                <label>{t("Title")} *</label>
                                                <input
                                                    type="text"
                                                    className="form-control "
                                                    {...register("title", {
                                                        required: true,
                                                    })}
                                                    required
                                                    placeholder={t("Title")}
                                                />
                                                <div className="invalid-feedback">
                                                    {errors.title && errors.title.message}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div class="form-group">
                                                    <label>{t("Status")} *</label>
                                                    <select placeholder={t("status")}
                                                        {...register("status", {
                                                            required: true,
                                                        })}
                                                        required className=" form-control">
                                                        <option value="Active">Active</option>
                                                        <option value="Inactive">Inactive</option>
                                                    </select>
                                                    <div className="invalid-feedback">
                                                        {errors.status && errors.status.message}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div class="form-group">
                                                    <div class="form-group w-100">
                                                        <label>{t("Date")} *</label>
                                                        <input
                                                            type="date"
                                                            defaultValue={today}
                                                            className="form-control flatpicker"
                                                            {...register("date", {
                                                                required: true,
                                                            })}
                                                            required
                                                            placeholder={t("date")}
                                                        />
                                                        <div className="invalid-feedback">
                                                            {errors.date && errors.date.message}
                                                        </div>
                                                    </div>
                                                    <div className="invalid-feedback">
                                                        {errors.date && errors.date.message}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="d-flex align-items-center w-100">
                                            <div class="form-group w-100">
                                                <label>{t("Photo")} *</label>
                                                <input
                                                    type="file"
                                                    className="form-control "
                                                    {...register("photo", {
                                                        required: true,
                                                    })}
                                                    required
                                                    placeholder={t("photo")}
                                                />
                                                <div className="invalid-feedback">
                                                    {errors.photo && errors.photo.message}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div class="form-group w-100">
                                            <label>{t("Images")} *</label>
                                            <input
                                                type="file"
                                                ref={inputRef}
                                                className="form-control mb-1"
                                                onChange={handleFileChange}
                                            />
                                            {files?.length > 0 && <div className="bg-light rounded p-2 d-flex align-items-center justify-content-center w-100">
                                                <div className="d-flex align-items-center justify-content-center">
                                                    {files.map((file, i) => (
                                                        <div className="d-flex align-items-center gap-2 position-relative" key={i}>
                                                            <img
                                                                src={URL.createObjectURL(file)}
                                                                alt={`preview-${i}`}
                                                                className="img-thumbnail"
                                                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                            />
                                                            <i
                                                                className="fa-solid fa-circle-xmark text-danger cursor-pointer position-absolute top-0 end-0"
                                                                onClick={() => handleDeleteFile(i)}
                                                            ></i>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>}
                                            <div className="invalid-feedback">
                                                {errors.photos && errors.photos.message}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div class="form-group">
                                            <div class="form-group">
                                                <label>{t("Tag")} *</label>
                                                <input
                                                    type="text"
                                                    className="form-control "
                                                    {...register("tag", {
                                                        required: true,
                                                    })}
                                                    required
                                                    placeholder={t("tag")}
                                                />
                                                <div className="invalid-feedback">
                                                    {errors.tag && errors.tag.message}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div class="form-group">
                                            <div class="form-group">
                                                <label>{t("User Name")} *</label>
                                                <input
                                                    type="text"
                                                    className="form-control "
                                                    {...register("user_name", {
                                                        required: true,
                                                    })}
                                                    required
                                                    placeholder={t("user name")}
                                                />
                                                <div className="invalid-feedback">
                                                    {errors.user_name && errors.user_name.message}
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-md-6">
                                        <div class="form-group">
                                            <div class="form-group">
                                                <label>{t("User Photo")} *</label>
                                                <input
                                                    type="file"
                                                    className="form-control "
                                                    {...register("user_photo", {
                                                        required: true,
                                                    })}
                                                    required
                                                    placeholder={t("user name")}
                                                />
                                                <div className="invalid-feedback">
                                                    {errors.user_photo && errors.user_photo.message}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div class="form-group">
                                            <div class="form-group">
                                                <label>{t("Button Text")} *</label>
                                                <input
                                                    type="text"
                                                    className="form-control "
                                                    {...register("button_text", {
                                                        required: true,
                                                    })}
                                                    required
                                                    placeholder={t("Click Me")}
                                                />
                                                <div className="invalid-feedback">
                                                    {errors.button_text && errors.button_text.message}
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-md-12">
                                        <div class="form-group">
                                            <label>{t("Description")} *</label>
                                            <SoftEditor value={description} onChange={(e) => { setDescription(e) }} />
                                            <div className="invalid-feedback">
                                                {errors.description && errors.description.message}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 mb-4 mt-3">
                                    {!saving && (
                                        <button type="submit" className="btn btn-primary float-end">
                                            {t("Save")}
                                        </button>
                                    )}
                                    {saving && (
                                        <button type="submit" className="btn btn-disabled float-end" disabled>
                                            {t("Saving ...")}
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default BlogCreate