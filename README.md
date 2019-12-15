# Forestrial Brain

Original repo with huge, messy file history: [gitlab.com/bakerkretzmar/forestrial-brain](https://gitlab.com/bakerkretzmar/forestrial-brain)

Online publication for the Forestrial Brain installation at Open Space gallery in Victoria, BC.

#### Description

A standalone static website documenting the _Forestrial Brain_ installation at Open Space. The installation was created by Jim Holyoak and Matt Shane in summer 2017. This site documents the project and related resources.

#### Build

The site is built with [Jekyll](https://jekyllrb.com/) and the Jekyll Assets plugin. To install and get set up, run `gem install jekyll bundler`, cd into the project directory, and run `bundle install`.

To run a local development server that live reloads the site, run `bundle exec jekyll serve`. This isn't really recommended because of the size of all the site's assets and the service worker's extremely aggressive caching.

To generate the production site, run `rake build`.

#### Host

I've set the site up with Amazon S3, but the static files generated into the `_site` folder can be hosted anywhere.

Using S3, you'll need to update your configuration and access tokens. The gem I'm using to take care of this is [s3_website](https://github.com/laurilehmijoki/s3_website). Then, deployment is as simple as `rake deploy`.




## Todo

- [ ] ISBN
- [ ] Meta description text

## Waiting on...

- [ ] Foreword: content from Helen
- [ ] Introduction: content from Breanna
- [ ] Jim's Trail Journal: need Matt's images
