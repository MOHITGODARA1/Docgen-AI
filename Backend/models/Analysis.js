import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
}, { _id: false });

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    repositoryUrl: { type: String, required: true },
    repoName: { type: String, required: true },
    analysisSections: {
      overview: { type: String },
      structure: { type: String },
      architecture: { type: String },
      docs: { type: String },
      setup: { type: String },
      suggestions: { type: String },
    },
  },
  { timestamps: true }
);

const Analysis = mongoose.model("Analysis", analysisSchema);

export default Analysis;
