import { defineField, defineType } from "sanity";
import Image from "next/image";
import { urlFor } from "../lib/image";

export const lessonCompletionType = defineType({
  name: "lessonCompletion",
  title: "Lesson Completion",
  type: "document",
  fields: [
    defineField({
      name: "student",
      title: "Student",
      type: "reference",
      to: [{ type: "student" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lesson",
      title: "Lesson",
      type: "reference",
      to: [{ type: "lesson" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "module",
      title: "Module",
      type: "reference",
      to: [{ type: "module" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "course",
      title: "Course",
      type: "reference",
      to: [{ type: "course" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "completedAt",
      title: "Completed At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      courseTitle: "course.title",
      lessonTitle: "lesson.title",
      completedAt: "completedAt",
      courseImage: "course.image",
    },
    prepare({ courseTitle, lessonTitle, completedAt, courseImage }) {
      return {
        title: `${courseTitle || "Course"}: "${lessonTitle || "Lesson"}"`,
        subtitle: completedAt ? new Date(completedAt).toLocaleDateString() : "",
        media: (
          <Image
            src={urlFor(courseImage).url()}
            alt={courseTitle}
            width={100}
            height={100}
          />
        ),
      };
    },
  },
});
