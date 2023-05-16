require 'rugged'
require 'linguist'

repo = Rugged::Repository.new('.')
project = Linguist::Repository.new(repo, repo.head.target_id)

puts "Primary Language: #{project.language}"
puts "Language Breakdown: #{project.languages}"
