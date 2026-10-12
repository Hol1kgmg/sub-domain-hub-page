{
  pin = {
    type = "github";
    owner = "millionco";
    repo = "react-doctor";
    branch = "main";
  };

  subdir = "skills";
  # performance が web-quality と ID 衝突するため react-doctor だけ拾う
  filter.nameRegex = "react-doctor";
}
