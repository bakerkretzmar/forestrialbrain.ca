# rake clean
desc "Delete built assets and caches"
task :clean do
  puts "--> Deleting asset cache and previous builds..."
  system "rm -r .asset-cache && bundle exec jekyll clean"
end

# rake build
desc "Regenerate files for production"
task :build do
  puts "--> Deleting asset cache and previous builds..."
  system "rm -r .asset-cache && bundle exec jekyll clean"
  puts "--> Regenerating files for production..."
  system "JEKYLL_ENV=production bundle exec jekyll build"
end

# rake archive
desc "Create a git archive of the current HEAD"
task :archive do
  puts "--> Archiving current HEAD into forestrialbrain.zip..."
  system "git archive -o forestrialbrain_`date +'%m-%d-%Y'`.zip HEAD"
end

# rake s3_website
desc "Push contents of _site to S3"
task :s3_website do
  puts "--> Syncing contents of _site to server..."
  system "s3_website push" # use --force with S3 config updates
end

# rake deploy
task :deploy => ["deploy:prod"]
namespace :deploy do
  desc "--> Regenerating and syncing production files..."
  task :prod => ["build", "s3_website"] do
  end
end
