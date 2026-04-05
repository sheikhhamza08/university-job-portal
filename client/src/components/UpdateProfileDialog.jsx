import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Loader2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const FormRow = ({ label, children }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "100px 1fr",
      alignItems: "center",
      gap: "12px",
      marginBottom: "12px",
    }}
  >
    <label
      style={{
        fontSize: "11.5px",
        fontWeight: 600,
        color: "oklch(0.129 0.042 264.695)",
        textAlign: "right",
      }}
    >
      {label}
    </label>
    {children}
  </div>
);

const inputStyle = {
  padding: "8px 12px",
  border: "0.5px solid oklch(0.929 0.013 255.508)",
  borderRadius: "8px",
  fontSize: "12.5px",
  fontFamily: "'Sora', sans-serif",
  color: "oklch(0.129 0.042 264.695)",
  background: "oklch(1 0 0)",
  outline: "none",
  width: "100%",
  transition: "border-color 0.15s",
};

const UpdateProfileDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
  });

  const changeEventHandler = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });
  const fileChangeHandler = (e) =>
    setInput({ ...input, file: e.target.files?.[0] });

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(input).forEach(([k, v]) => {
        if (v) formData.append(k, v);
      });
      const response = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );
      if (response.data.success) {
        dispatch(setUser(response.data.user));
        toast.success("Profile updated successfully");
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        style={{
          fontFamily: "'Sora', sans-serif",
          borderRadius: "16px",
          border: "0.5px solid oklch(0.929 0.013 255.508)",
          padding: "1.75rem",
          maxWidth: "480px",
        }}
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.25rem",
              paddingBottom: "1rem",
              borderBottom: "0.5px solid oklch(0.929 0.013 255.508)",
            }}
          >
            <DialogTitle
              style={{
                fontSize: "15px",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Update Profile
            </DialogTitle>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "oklch(0.554 0.046 257.417)",
                display: "flex",
              }}
            >
              <X size={16} />
            </button>
          </div>
        </DialogHeader>

        <form onSubmit={submitHandler}>
          {[
            {
              label: "Name",
              name: "fullname",
              type: "text",
              placeholder: "Full name",
            },
            {
              label: "Email",
              name: "email",
              type: "email",
              placeholder: "Email address",
            },
            {
              label: "Phone",
              name: "phoneNumber",
              type: "text",
              placeholder: "Phone number",
            },
            {
              label: "Bio",
              name: "bio",
              type: "text",
              placeholder: "About yourself",
            },
            {
              label: "Skills",
              name: "skills",
              type: "text",
              placeholder: "Comma separated",
            },
          ].map(({ label, name, type, placeholder }) => (
            <FormRow key={name} label={label}>
              <input
                name={name}
                type={type}
                placeholder={placeholder}
                value={input[name]}
                onChange={changeEventHandler}
                style={inputStyle}
                onFocus={(e) =>
                  (e.target.style.borderColor = "oklch(0.554 0.046 257.417)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "oklch(0.929 0.013 255.508)")
                }
              />
            </FormRow>
          ))}

          <FormRow label="Resume">
            <input
              type="file"
              name="file"
              accept="application/pdf"
              onChange={fileChangeHandler}
              style={{ ...inputStyle, padding: "6px 12px", cursor: "pointer" }}
            />
          </FormRow>

          <DialogFooter
            style={{
              display: "flex",
              gap: "8px",
              justifyContent: "flex-end",
              marginTop: "1.25rem",
              paddingTop: "1rem",
              borderTop: "0.5px solid oklch(0.929 0.013 255.508)",
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{
                padding: "8px 18px",
                border: "0.5px solid oklch(0.929 0.013 255.508)",
                borderRadius: "8px",
                background: "oklch(1 0 0)",
                fontSize: "12px",
                fontWeight: 500,
                fontFamily: "'Sora', sans-serif",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "8px 18px",
                border: "none",
                borderRadius: "8px",
                background: "oklch(0.208 0.042 265.755)",
                color: "oklch(0.984 0.003 247.858)",
                fontSize: "12px",
                fontWeight: 600,
                fontFamily: "'Sora', sans-serif",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                opacity: loading ? 0.75 : 1,
              }}
            >
              {loading && <Loader2 size={13} className="animate-spin" />}
              {loading ? "Saving…" : "Save Changes"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
