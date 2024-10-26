# Contributing

## Adding Your Website

### Allowed Frameworks

Your website must be built with one of the following approved frameworks:

- **Next.js**
- **React**
- **Vue**
- **Nuxt**
- **Svelte**
- **Remix**
- **Svelte Kit**
- **Solid.JS**
- **Astro**
- **Qwik**

### Step-by-Step Guide

1. **Prepare Your Website Data**:
   - Gather the following information:
     - Website name
     - Description
     - URL link
     - Framework used (from the allowed frameworks)

2. **Create a YAML File**:
   - Navigate to the `src/data` directory.
   - Create a new file named `your-website-name.yml` (use hyphens instead of spaces).
   - Structure your YAML file as follows:

     ```yaml
     name: Your Website Name
     description: A brief description of your website.
     link: https://yourwebsite.com
     build-with: Framework
     ```

3. **Add a Thumbnail Image**:
   - Create a PNG image named `your-website-name.png` (same base name as the YAML file).
   - Ensure the image size does not exceed 8 MB.

4. **Validate Your Files**:
   - Run the validation script:

     ```bash
     python validate.py  # Adjust based on the script name
     ```

   - Fix any reported errors before proceeding.

5. **Submit Your Changes**:
   - Commit your changes:

     ```bash
     git add src/data/your-website-name.yml src/data/your-website-name.png
     git commit -m "Add Your Website Name"
     ```

   - Push to your forked repository:

     ```bash
     git push origin your-branch-name
     ```

6. **Create a Pull Request**:
   - Go to the main repository on GitHub and create a new Pull Request.
   - Include a clear description of your additions.

7. **Review Process**:
   - Maintain open communication with the reviewers for any feedback or required adjustments.

### Tips for a Successful Submission

- Ensure your YAML file syntax is correct to avoid validation errors.
- Provide a concise yet informative description of your website.
- Verify that your URL link is functional and accurate.
- Use high-quality images for optimal representation.
